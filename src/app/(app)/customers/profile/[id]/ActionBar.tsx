// app/(app)/customers/profile/[id]/ActionBar.tsx
"use client";

export default function ActionBar({ data }: { data: any }) {
  const onDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `customer-${data?.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="mb-3 flex items-center gap-2">
      <button onClick={onDownload} className="h-9 rounded-md bg-gray-900 px-3 text-[13px] text-white hover:bg-gray-800 dark:bg-gray-900">Download</button>
      <button onClick={() => window.print()} className="h-9 rounded-md border border-gray-300 bg-white px-3 text-[13px] text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-800">Print</button>
    </div>
  );
}
