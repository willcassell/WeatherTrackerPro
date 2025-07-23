import { Wind } from "lucide-react";

interface WindCardProps {
  windSpeed?: number;
  windGust?: number;
  windDirection?: number;
  windDirectionCardinal?: string;
}

export default function WindCard({ 
  windSpeed, 
  windGust,
  windDirection, 
  windDirectionCardinal 
}: WindCardProps) {
  const formatWindSpeed = (speed?: number) => {
    return speed !== undefined ? speed.toFixed(1) : "--";
  };

  const formatDirection = (direction?: number) => {
    return direction !== undefined ? `${Math.round(direction)}°` : "--°";
  };

  return (
    <div className="weather-card minimal-padding">
      <div className="weather-card-header">
        <h3 className="weather-card-title">Wind</h3>
        <Wind className="weather-card-icon h-4 w-4" />
      </div>
      <div className="flex items-center space-x-4">
        {/* Left Side - Compass Rose */}
        <div className="relative w-12 h-12 flex-shrink-0">
          <div className="absolute inset-0 border-2 border-border rounded-full"></div>
          {/* Cardinal directions */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs font-medium text-muted-foreground">
            N
          </div>
          <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 text-xs font-medium text-muted-foreground">
            E
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 text-xs font-medium text-muted-foreground">
            S
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 text-xs font-medium text-muted-foreground">
            W
          </div>
          {/* Wind direction indicator */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              transform: `translate(-50%, -50%) rotate(${windDirection || 0}deg)` 
            }}
          >
            <div className="w-0.5 h-5 bg-primary transform -translate-y-2.5 rounded-full"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-b-[6px] border-transparent border-b-primary"></div>
          </div>
        </div>
        
        {/* Center - Wind Speed */}
        <div className="flex-1">
          <div className="text-lg font-bold text-foreground">
            {formatWindSpeed(windSpeed)} mph
          </div>
          <div className="text-xs text-muted-foreground">
            {windDirectionCardinal || "N"} ({formatDirection(windDirection)})
          </div>
        </div>
        
        {/* Right Side - Wind Gust Data */}
        <div className="text-right">
          <div className="text-sm font-bold text-orange-400">
            {formatWindSpeed(windGust)} mph
          </div>
          <div className="text-xs text-muted-foreground">Gusts</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {windGust && windSpeed ? `+${(windGust - windSpeed).toFixed(1)}` : '--'}
          </div>
        </div>
      </div>
    </div>
  );
}