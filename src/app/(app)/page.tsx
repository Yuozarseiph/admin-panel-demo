// app/page.tsx
import CustomerKPIs from "@/components/customers/CustomerKPIs";
import SalesAnalyticsDonut from "@/components/customers/SalesAnalyticsDonut";
import CustomerGrowthSummary from "@/components/customers/CustomerGrowthSummary";
import CustomerListTable from "@/components/customers/CustomerListTable";
import PlatformsDonut from "@/components/customers/PlatformsDonut";
import SalesPerformanceBars from "@/components/customers/SalesPerformanceBars";
import RatingAnalyticsRings from "@/components/customers/RatingAnalyticsRings";
import CustomerActivityGauge from "@/components/customers/CustomerActivityGauge";
import ProvincesAndCountriesCard from "@/components/customers/ProvincesAndCountriesCard";
import PatientAppointmentFa from "@/components/customers/Analitics";

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
