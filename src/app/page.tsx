import { BusinessTable } from "@/components/business-table";
import { MapContainer } from "@/components/map-container";
import { MapLocator } from "@/components/map-locator";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between py-24">
      <MapContainer />
      {/* <BusinessTable /> */}
    </main>
  );
}
