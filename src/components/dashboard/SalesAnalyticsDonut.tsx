// components/customers/SalesAnalyticsDonut.tsx
'use client';

import { useState } from 'react';
import { Box, Flex, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { name: 'فروش', value: 600 },
  { name: 'توزیع', value: 250 },
  { name: 'بازگشت', value: 150 },
];

const viewOptions = [
  {
    value: 'Daily',
    label: 'روزانه',
  },
  {
    value: 'Monthly',
    label: 'ماهانه',
  },
];

const valueSum = data.reduce((total, item) => total + item.value, 0);
const calculatePercentage = (part: number, total: number) =>
  ((part / total) * 100).toFixed(2);

const COLORS = ['#8DE3F5', '#59A7FF', '#A5F6C6'];

const toFa = (n: number) => n.toLocaleString('fa-IR');

// WidgetCard Component
function WidgetCard({
  title,
  action,
  children,
  className,
  headerClassName,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}) {
  return (
    <Box
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900',
        className
      )}
    >
      <Flex
        justify="between"
        align="center"
        className={cn('mb-6', headerClassName)}
      >
        <Text className="text-[18px] font-bold text-gray-900 dark:text-gray-100">
          {title}
        </Text>
        {action}
      </Flex>
      {children}
    </Box>
  );
}

// DropdownAction Component
function DropdownAction({
  options,
  onChange,
}: {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <Flex align="center" className="gap-2">
      <Box className="relative">
        <select
          value={selectedValue}
          onChange={handleChange}
          className="h-9 appearance-none rounded-lg border border-gray-300 bg-white py-1.5 pl-8 pr-3 text-[13px] text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </Box>

      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
    </Flex>
  );
}

export default function SalesAnalytics({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  function handleChange(viewType: string) {
    console.log(viewType);
  }

  return (
    <WidgetCard
      title="تحلیل فروش"
      className={cn('@container', className)}
      headerClassName="mb-6 lg:mb-0"
      action={<DropdownAction options={viewOptions} onChange={handleChange} />}
    >
      <Box className="relative mx-auto size-[290px] @sm:size-[340px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="relative z-10"
        >
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              dataKey="value"
              innerRadius="42%"
              outerRadius="70%"
              fill="#8884d8"
              paddingAngle={4}
              data={data}
              onMouseEnter={onPieEnter}
              cornerRadius={6}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <Box className="absolute inset-24 flex flex-col items-center justify-center rounded-full bg-white shadow-[0px_4px_20px_0px_#00000029] @sm:inset-28 dark:bg-gray-200">
          <Text className="text-center text-gray-500">کل فروش</Text>
          <Text className="text-xl font-semibold dark:text-white">
            {toFa(valueSum)}
          </Text>
        </Box>
      </Box>

      <Flex justify="center" className="flex-wrap @lg:gap-8">
        {data.map((item, index) => (
          <Box key={item.name}>
            <Flex align="center" gap="1">
              <span
                className="me-2 h-2.5 w-3.5 flex-shrink-0"
                style={{ backgroundColor: COLORS[index] }}
              />
              <Text as="span" className="whitespace-nowrap">
                {item.name}
              </Text>
            </Flex>
            <Text as="p" className="ms-[26px] font-medium">
              {toFa(parseFloat(calculatePercentage(item.value, valueSum)))}%
            </Text>
          </Box>
        ))}
      </Flex>
    </WidgetCard>
  );
}
