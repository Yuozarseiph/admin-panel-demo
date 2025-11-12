// app/customers/page.tsx

// ویجت‌ها
import CustomerKPIs from "@/components/customers/CustomerKPIs";
import SalesAnalyticsDonut from "@/components/customers/SalesAnalyticsDonut";
import CustomerGrowthSummary from "@/components/customers/CustomerGrowthSummary";
import CustomerListTable from "@/components/customers/CustomerListTable";
import PlatformsDonut from "@/components/customers/PlatformsDonut";
import RevenueGrowthLine from "@/components/customers/RevenueGrowthLine";
import SalesPerformanceBars from "@/components/customers/SalesPerformanceBars";
import RatingAnalyticsRings from "@/components/customers/RatingAnalyticsRings";
import CustomerActivityGauge from "@/components/customers/CustomerActivityGauge";
import ProvincesAndCountriesCard from "@/components/customers/ProvincesAndCountriesCard";

export default function CustomersPage() {
  return (
    <main className="space-y-4">
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
        <div className="lg:col-span-2">
          <RevenueGrowthLine />
        </div>
        <div className="lg:col-span-1">
          <SalesPerformanceBars />
        </div>
      </div>

      <ProvincesAndCountriesCard />

      <div className="grid gap-4 lg:grid-cols-2">
        <RatingAnalyticsRings />
        <CustomerActivityGauge />
      </div>
    </main>
  );
}
