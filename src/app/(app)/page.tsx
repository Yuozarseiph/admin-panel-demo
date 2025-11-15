// app/page.tsx
import CustomerKPIs from "@/components/dashboard/CustomerKPIs";
import SalesAnalyticsDonut from "@/components/dashboard/SalesAnalyticsDonut";
import CustomerGrowthSummary from "@/components/dashboard/CustomerGrowthSummary";
import CustomerListTable from "@/components/dashboard/CustomerListTable";
import PlatformsDonut from "@/components/dashboard/PlatformsDonut";
import SalesPerformanceBars from "@/components/dashboard/SalesPerformanceBars";
import RatingAnalyticsRings from "@/components/dashboard/RatingAnalyticsRings";
import CustomerActivityGauge from "@/components/dashboard/CustomerActivityGauge";
import ProvincesAndCountriesCard from "@/components/dashboard/ProvincesAndCountriesCard";
import PatientAppointmentFa from "@/components/dashboard/Analitics";

export default function Page() {
  return (
    <main className="space-y-4 max-w-svw overflow-x-hidden">
      <CustomerKPIs />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <SalesAnalyticsDonut />
        </div>
        <div className="lg:col-span-2">
          <CustomerGrowthSummary />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CustomerListTable />
        </div>
        <div className="lg:col-span-1">
          <PlatformsDonut />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CustomerActivityGauge />
        </div>
        <div className="lg:col-span-2">
          <PatientAppointmentFa />
        </div>
      </div>

      <ProvincesAndCountriesCard />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesPerformanceBars />
        </div>
        <div className="lg:col-span-1">
          <RatingAnalyticsRings />
        </div>
      </div>
    </main>
  );
}
