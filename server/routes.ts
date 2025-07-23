import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWeatherDataSchema, type WeatherFlowStation, type WeatherFlowObservation, type WeatherFlowForecast } from "@shared/schema";
import { z } from "zod";

const WEATHERFLOW_API_BASE = "https://swd.weatherflow.com/swd/rest";
const STATION_ID = "38335";

// Get API token from environment variables
const getApiToken = () => {
  return process.env.WEATHERFLOW_API_TOKEN || 
         process.env.TEMPEST_API_TOKEN || 
         process.env.API_TOKEN ||
         process.env.WEATHERFLOW_ACCESS_TOKEN;
};

// Helper function to convert wind direction degrees to cardinal direction
function degreesToCardinal(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

// Helper function to determine pressure trend
function determinePressureTrend(currentPressure: number, historicalData: any[]): string {
  if (historicalData.length < 2) return "Steady";
  
  const previousPressure = historicalData[historicalData.length - 2]?.pressure;
  if (!previousPressure) return "Steady";
  
  const diff = currentPressure - previousPressure;
  if (diff > 0.03) return "Rising";
  if (diff < -0.03) return "Falling";
  return "Steady";
}

async function fetchWeatherFlowData(): Promise<any> {
  const token = getApiToken();
  if (!token) {
    throw new Error("WeatherFlow API token not found in environment variables");
  }

  try {
    // Fetch current conditions and forecast
    const forecastResponse = await fetch(
      `${WEATHERFLOW_API_BASE}/better_forecast?station_id=${STATION_ID}&token=${token}`
    );

    if (!forecastResponse.ok) {
      throw new Error(`WeatherFlow API error: ${forecastResponse.status} ${forecastResponse.statusText}`);
    }

    const forecastData: WeatherFlowForecast = await forecastResponse.json();
    
    // Get historical data for pressure trend calculation
    const historicalData = await storage.getWeatherHistory(STATION_ID, 6);
    
    const currentConditions = forecastData.current_conditions;
    const todayForecast = forecastData.forecast?.daily[0];
    const yesterdayForecast = forecastData.forecast?.daily[1];

    // Convert WeatherFlow data to our format
    const weatherData = {
      stationId: STATION_ID,
      temperature: currentConditions.air_temperature,
      temperatureHigh: todayForecast?.air_temp_high || currentConditions.air_temperature,
      temperatureLow: todayForecast?.air_temp_low || currentConditions.air_temperature,
      windSpeed: currentConditions.wind_avg,
      windDirection: currentConditions.wind_direction,
      windDirectionCardinal: degreesToCardinal(currentConditions.wind_direction),
      pressure: currentConditions.sea_level_pressure,
      pressureTrend: currentConditions.pressure_trend || determinePressureTrend(currentConditions.sea_level_pressure, historicalData),
      humidity: currentConditions.relative_humidity,
      uvIndex: currentConditions.uv,
      visibility: 10.0, // WeatherFlow doesn't provide visibility, using default
      rainToday: 0.0, // Would need additional API call for precipitation data
      rainYesterday: 0.0, // Would need historical precipitation data
    };

    return weatherData;
  } catch (error) {
    console.error("Error fetching WeatherFlow data:", error);
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current weather data
  app.get("/api/weather/current", async (req, res) => {
    try {
      const currentData = await storage.getLatestWeatherData(STATION_ID);
      
      // If no data or data is older than 10 minutes, fetch fresh data
      const shouldRefresh = !currentData || 
        (currentData.lastUpdated && Date.now() - currentData.lastUpdated.getTime() > 10 * 60 * 1000);
      
      if (shouldRefresh) {
        console.log("Fetching fresh weather data from WeatherFlow API...");
        const freshData = await fetchWeatherFlowData();
        const savedData = await storage.saveWeatherData(freshData);
        res.json(savedData);
      } else {
        res.json(currentData);
      }
    } catch (error) {
      console.error("Error getting current weather:", error);
      res.status(500).json({ 
        error: "Failed to fetch weather data",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Force refresh weather data
  app.post("/api/weather/refresh", async (req, res) => {
    try {
      console.log("Force refreshing weather data...");
      const freshData = await fetchWeatherFlowData();
      const savedData = await storage.saveWeatherData(freshData);
      res.json(savedData);
    } catch (error) {
      console.error("Error refreshing weather data:", error);
      res.status(500).json({ 
        error: "Failed to refresh weather data",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get weather history
  app.get("/api/weather/history/:hours", async (req, res) => {
    try {
      const hours = parseInt(req.params.hours) || 24;
      const history = await storage.getWeatherHistory(STATION_ID, hours);
      res.json(history);
    } catch (error) {
      console.error("Error getting weather history:", error);
      res.status(500).json({ 
        error: "Failed to fetch weather history",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
