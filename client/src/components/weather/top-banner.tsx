import { Radio, Clock } from "lucide-react";
import { format } from "date-fns";

interface TopBannerProps {
  stationId: string;
  lastUpdated?: Date;
  isLoading?: boolean;
}

export default function TopBanner({ stationId, lastUpdated, isLoading }: TopBannerProps) {
  const formatLastUpdated = (date?: Date) => {
    if (!date) return "Never";
    return format(date, "MMM d, yyyy h:mm a zzz");
  };

  return (
    <header className="bg-card border-b border-border py-2 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Radio className="text-primary text-lg" />
          <h1 className="text-lg font-semibold">
            WeatherFlow Tempest Station {stationId}
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground text-sm">
          <Clock className="h-4 w-4" />
          <span>
            Last updated: {formatLastUpdated(lastUpdated)}
          </span>
          <div 
            className={`w-2 h-2 rounded-full ${
              isLoading 
                ? 'bg-warning animate-pulse' 
                : 'animate-pulse-green'
            }`} 
            title={isLoading ? "Updating..." : "Live updates active"}
          />
        </div>
      </div>
    </header>
  );
}
