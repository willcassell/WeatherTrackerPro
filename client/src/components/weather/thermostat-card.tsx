import { Home, Thermometer } from "lucide-react";

interface ThermostatData {
  name: string;
  temperature: number;
  targetTemp: number;
  humidity?: number;
  mode: 'heat' | 'cool' | 'auto' | 'off';
}

interface ThermostatCardProps {
  thermostats?: ThermostatData[];
  isLoading?: boolean;
  error?: string;
}

export default function ThermostatCard({ 
  thermostats = [], 
  isLoading = false, 
  error 
}: ThermostatCardProps) {
  const formatTemp = (temp: number) => `${temp.toFixed(1)}°F`;
  
  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'heat': return 'text-red-400';
      case 'cool': return 'text-blue-400';
      case 'auto': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'heat': return '🔥';
      case 'cool': return '❄️';
      case 'auto': return '🎯';
      default: return '⏸️';
    }
  };

  if (error) {
    return (
      <div className="weather-card minimal-padding col-span-2">
        <div className="weather-card-header">
          <h3 className="weather-card-title">Indoor Temperature</h3>
          <Home className="weather-card-icon h-4 w-4" />
        </div>
        <div className="flex items-center justify-center py-4">
          <div className="text-center">
            <div className="text-sm text-red-400 mb-1">Connection Error</div>
            <div className="text-xs text-muted-foreground">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="weather-card minimal-padding col-span-2">
        <div className="weather-card-header">
          <h3 className="weather-card-title">Indoor Temperature</h3>
          <Home className="weather-card-icon h-4 w-4" />
        </div>
        <div className="flex items-center justify-center py-4">
          <div className="text-center">
            <Thermometer className="h-6 w-6 text-muted-foreground animate-pulse mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Loading thermostats...</div>
          </div>
        </div>
      </div>
    );
  }

  if (thermostats.length === 0) {
    return (
      <div className="weather-card minimal-padding col-span-2">
        <div className="weather-card-header">
          <h3 className="weather-card-title">Indoor Temperature</h3>
          <Home className="weather-card-icon h-4 w-4" />
        </div>
        <div className="flex items-center justify-center py-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">No Thermostats</div>
            <div className="text-xs text-muted-foreground">Check API configuration</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-card minimal-padding col-span-2">
      <div className="weather-card-header">
        <h3 className="weather-card-title">Indoor Temperature</h3>
        <Home className="weather-card-icon h-4 w-4" />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {thermostats.map((thermostat, index) => (
          <div key={index} className="relative">
            {/* Thermostat Location */}
            <div className="text-xs text-muted-foreground mb-1 font-medium">
              {thermostat.name}
            </div>
            
            {/* Temperature Display */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-bold text-foreground">
                  {formatTemp(thermostat.temperature)}
                </span>
                <span className="text-xs text-muted-foreground">
                  current
                </span>
              </div>
              
              <div className="text-right">
                <div className={`text-sm font-medium ${getModeColor(thermostat.mode)}`}>
                  {getModeIcon(thermostat.mode)} {formatTemp(thermostat.targetTemp)}
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {thermostat.mode}
                </div>
              </div>
            </div>
            
            {/* Temperature Comparison */}
            <div className="mt-1">
              <div className={`text-xs ${
                thermostat.temperature > thermostat.targetTemp 
                  ? 'text-red-300' 
                  : thermostat.temperature < thermostat.targetTemp 
                    ? 'text-blue-300' 
                    : 'text-green-300'
              }`}>
                {thermostat.temperature > thermostat.targetTemp 
                  ? `+${(thermostat.temperature - thermostat.targetTemp).toFixed(1)}° above target`
                  : thermostat.temperature < thermostat.targetTemp 
                    ? `${(thermostat.targetTemp - thermostat.temperature).toFixed(1)}° below target`
                    : 'At target temperature'
                }
              </div>
            </div>

            {/* Humidity if available */}
            {thermostat.humidity && (
              <div className="text-xs text-muted-foreground mt-0.5">
                {thermostat.humidity}% humidity
              </div>
            )}

            {/* Visual separator between thermostats */}
            {index < thermostats.length - 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-px bg-border"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}