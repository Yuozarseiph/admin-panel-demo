// types/recharts-augment.d.ts
import "recharts";

declare module "recharts" {
  interface RadialBarProps {
    innerRadius?: number | string;
    outerRadius?: number | string;
  }
}
