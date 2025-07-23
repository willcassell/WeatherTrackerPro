import { CloudRain, Droplets } from "lucide-react";

interface RainfallCardProps {
  todayRain?: number;
  yesterdayRain?: number;
}

export default function RainfallCard({ todayRain, yesterdayRain }: RainfallCardProps) {
  const formatRain = (amount?: number) => {
    return amount !== undefined ? amount.toFixed(2) : "--";
  };

  // Calculate bar heights (max 1 inch for visual scaling)
  const maxRain = Math.max(todayRain || 0, yesterdayRain || 0, 0.1); // Minimum 0.1 for scaling
  const todayHeight = todayRain ? Math.min((todayRain / Math.max(maxRain, 1)) * 100, 100) : 0;
  const yesterdayHeight = yesterdayRain ? Math.min((yesterdayRain / Math.max(maxRain, 1)) * 100, 100) : 0;

  return (
    <div className="weather-card minimal-padding">
      <div className="weather-card-header">
        <h3 className="weather-card-title">Rainfall</h3>
        <CloudRain className="weather-card-icon h-4 w-4" />
      </div>
      <div className="flex items-end justify-between space-x-4">
        {/* Left - Today's rainfall with visual bar */}
        <div className="flex-1">
          <div className="flex items-end space-x-2">
            {/* Visual rain bar for today */}
            <div className="flex flex-col items-center space-y-1">
              <div className="relative w-8 h-16 bg-gray-700 rounded-b-full overflow-hidden">
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-b-full"
                  style={{ height: `${todayHeight}%` }}
                />
                {/* Droplet indicators */}
                {todayRain && todayRain > 0 && (
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                    <Droplets className="h-3 w-3 text-blue-200" />
                  </div>
                )}
              </div>
              <div className="text-xs text-cyan-400 font-medium">Today</div>
            </div>
            
            {/* Today's value */}
            <div className="text-left">
              <div className="text-xl font-bold text-cyan-400">
                {formatRain(todayRain)}
              </div>
              <div className="text-xs text-muted-foreground">inches</div>
            </div>
          </div>
        </div>
        
        {/* Right - Yesterday's rainfall (right-justified) */}
        <div className="text-right">
          <div className="flex items-end justify-end space-x-2">
            {/* Yesterday's value */}
            <div className="text-right">
              <div className="text-lg font-bold text-blue-300">
                {formatRain(yesterdayRain)}
              </div>
              <div className="text-xs text-muted-foreground">inches</div>
            </div>
            
            {/* Visual rain bar for yesterday */}
            <div className="flex flex-col items-center space-y-1">
              <div className="relative w-6 h-12 bg-gray-700 rounded-b-full overflow-hidden">
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-b-full"
                  style={{ height: `${yesterdayHeight}%` }}
                />
                {/* Droplet indicators */}
                {yesterdayRain && yesterdayRain > 0 && (
                  <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2">
                    <Droplets className="h-2 w-2 text-blue-200" />
                  </div>
                )}
              </div>
              <div className="text-xs text-blue-300 font-medium">Yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}