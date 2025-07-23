import { Gauge, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PressureCardProps {
  pressure?: number;
  trend?: string;
}

export default function PressureCard({ pressure, trend }: PressureCardProps) {
  const formatPressure = (value?: number) => {
    return value !== undefined ? value.toFixed(2) : "--";
  };

  const getTrendIcon = (trendValue?: string) => {
    switch (trendValue?.toLowerCase()) {
      case 'rising':
        return <TrendingUp className="h-3 w-3" />;
      case 'falling':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = (trendValue?: string) => {
    switch (trendValue?.toLowerCase()) {
      case 'rising':
        return 'text-green-400';
      case 'falling':
        return 'text-red-400';
      default:
        return 'text-muted-foreground';
    }
  };

  // Calculate pressure gauge position (typical range 29.5-30.5 inHg)
  const minPressure = 29.5;
  const maxPressure = 30.5;
  const pressurePosition = pressure 
    ? Math.max(0, Math.min(100, ((pressure - minPressure) / (maxPressure - minPressure)) * 100))
    : 50;

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <h3 className="weather-card-title">Barometric Pressure</h3>
        <Gauge className="weather-card-icon h-5 w-5" />
      </div>
      <div className="flex items-center space-x-4">
        {/* Pressure Gauge */}
        <div className="relative w-16 h-8 flex-shrink-0">
          <div className="absolute inset-0 bg-muted rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full opacity-60"></div>
          {/* Pressure indicator */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-full shadow-lg"
            style={{ left: `${pressurePosition}%` }}
          />
          <div className="absolute -bottom-4 left-0 text-xs text-muted-foreground">29.5</div>
          <div className="absolute -bottom-4 right-0 text-xs text-muted-foreground">30.5</div>
        </div>
        <div className="flex-1">
          <div className="text-xl font-bold text-foreground">
            {formatPressure(pressure)} in
          </div>
          <div className={`flex items-center space-x-1 text-sm ${getTrendColor(trend)}`}>
            {getTrendIcon(trend)}
            <span>{trend || 'Steady'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
