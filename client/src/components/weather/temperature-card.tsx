import { Thermometer, TrendingUp, TrendingDown } from "lucide-react";

interface TemperatureCardProps {
  currentTemp?: number;
  highTemp?: number;
  lowTemp?: number;
}

export default function TemperatureCard({ 
  currentTemp, 
  highTemp, 
  lowTemp 
}: TemperatureCardProps) {
  const formatTemp = (temp?: number) => {
    return temp !== undefined ? temp.toFixed(1) : "--";
  };

  return (
    <div className="weather-card minimal-padding">
      <div className="weather-card-header">
        <h3 className="weather-card-title">Temperature</h3>
        <Thermometer className="weather-card-icon h-4 w-4" />
      </div>
      <div className="flex items-end space-x-3">
        <div className="text-3xl font-bold text-foreground">
          {formatTemp(currentTemp)}°F
        </div>
        <div className="flex flex-col text-sm space-y-0.5 pb-1">
          <div className="flex items-center space-x-1 text-red-400">
            <TrendingUp className="h-3 w-3" />
            <span>{formatTemp(highTemp)}°F</span>
          </div>
          <div className="flex items-center space-x-1 text-blue-400">
            <TrendingDown className="h-3 w-3" />
            <span>{formatTemp(lowTemp)}°F</span>
          </div>
        </div>
      </div>
    </div>
  );
}