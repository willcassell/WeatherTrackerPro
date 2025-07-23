import { BarChart3 } from "lucide-react";

interface AdditionalDataCardProps {
  humidity?: number;
  uvIndex?: number;
  visibility?: number;
}

export default function AdditionalDataCard({ 
  humidity, 
  uvIndex, 
  visibility 
}: AdditionalDataCardProps) {
  const formatValue = (value?: number, decimals: number = 0) => {
    return value !== undefined ? value.toFixed(decimals) : "--";
  };

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <h3 className="weather-card-title">Additional Data</h3>
        <BarChart3 className="weather-card-icon h-5 w-5" />
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-foreground">
            {formatValue(humidity)}%
          </div>
          <div className="text-xs text-muted-foreground">Humidity</div>
        </div>
        <div>
          <div className="text-lg font-bold text-foreground">
            {formatValue(uvIndex)}
          </div>
          <div className="text-xs text-muted-foreground">UV Index</div>
        </div>
        <div>
          <div className="text-lg font-bold text-foreground">
            {formatValue(visibility)} mi
          </div>
          <div className="text-xs text-muted-foreground">Visibility</div>
        </div>
      </div>
    </div>
  );
}
