import { CloudRain } from "lucide-react";

interface RainfallCardProps {
  todayRain?: number;
  yesterdayRain?: number;
}

export default function RainfallCard({ todayRain, yesterdayRain }: RainfallCardProps) {
  const formatRain = (amount?: number) => {
    return amount !== undefined ? amount.toFixed(2) : "--";
  };

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <h3 className="weather-card-title">Rainfall</h3>
        <CloudRain className="weather-card-icon h-5 w-5" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-lg font-bold text-foreground">
            {formatRain(todayRain)} in
          </div>
          <div className="text-xs text-muted-foreground">Today</div>
        </div>
        <div>
          <div className="text-lg font-bold text-foreground">
            {formatRain(yesterdayRain)} in
          </div>
          <div className="text-xs text-muted-foreground">Yesterday</div>
        </div>
      </div>
    </div>
  );
}
