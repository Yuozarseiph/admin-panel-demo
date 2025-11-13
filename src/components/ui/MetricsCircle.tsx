"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function MetricsCircle({
  title,
  valueText,
  percent = 54,
  color = "#3b82f6",
  track = "#E8EEFC",
}: {
  title: string;
  valueText: string;
  percent?: number;
  color?: string;
  track?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div style={{ width: 56, height: 56 }}>
        <CircularProgressbar
          value={percent}
          text={`${Math.round(percent)}%`}
          strokeWidth={10}
          styles={buildStyles({
            textSize: "28px",
            pathColor: color,
            trailColor: track,
            textColor: "#6b7280",
          })}
        />
      </div>
      <div className="text-right">
        <div className="text-[14px] text-gray-500">{title}</div>
        <div className="mt-1 text-[22px] font-bold">{valueText}</div>
      </div>
    </div>
  );
}
