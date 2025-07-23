import { Activity } from "lucide-react";

export default function RadarDisplay() {
  const radarUrl = "https://embed.windy.com/embed2.html?lat=37.000&lon=-78.415&detailLat=37.000&detailLon=-78.415&width=650&height=450&zoom=7&level=surface&overlay=radar&product=radar&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=mph&metricTemp=%C2%B0F&radarRange=-1";

  return (
    <div className="h-full relative">
      <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
        <Activity className="inline-block mr-1 h-4 w-4" />
        Live Radar
      </div>
      {/* Windy Radar Embed */}
      <iframe 
        src={radarUrl}
        className="w-full h-full border-0"
        frameBorder="0"
        title="Weather Radar"
        allow="geolocation"
      />
    </div>
  );
}
