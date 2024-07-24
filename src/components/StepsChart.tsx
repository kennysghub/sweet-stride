// import React, { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   ReferenceLine,
// } from "recharts";
// import { loadCSV, FitnessData } from "../utils/DataLoader";

// interface StepsChartProps {
//   year: string;
// }

// const StepsChart: React.FC<StepsChartProps> = ({ year }) => {
//   const [data, setData] = useState<FitnessData[]>([]);
//   const [selectedMonth, setSelectedMonth] = useState<string>("all");

//   useEffect(() => {
//     loadCSV(`/data/steps_${year}.csv`).then(setData);
//   }, [year]);

//   const filteredData =
//     selectedMonth === "all"
//       ? data
//       : data.filter(
//           (item) =>
//             new Date(item.Date).getMonth() === parseInt(selectedMonth) - 1
//         );

//   const maxSteps = Math.max(
//     ...filteredData.map((item) => Number(item.Steps) || 0)
//   );
//   const yAxisDomain = [0, Math.ceil(maxSteps / 1000) * 1000]; // Round up to nearest 1000

//   const average = Math.round(
//     filteredData.reduce((sum, item) => sum + (Number(item.Steps) || 0), 0) /
//       filteredData.length
//   );

//   return (
//     <div>
//       <h2>Steps {year}</h2>
//       <select
//         value={selectedMonth}
//         onChange={(e) => setSelectedMonth(e.target.value)}
//       >
//         <option value="all">All Months</option>
//         <option value="1">January</option>
//         <option value="2">February</option>
//         <option value="3">March</option>
//         <option value="4">April</option>
//         <option value="5">May</option>
//         <option value="6">June</option>
//         <option value="7">July</option>
//         <option value="8">August</option>
//         <option value="9">September</option>
//         <option value="10">October</option>
//         <option value="11">November</option>
//         <option value="12">December</option>
//       </select>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart
//           data={filteredData}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="Date"
//             tickFormatter={(tick) =>
//               new Date(tick).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//               })
//             }
//             interval={selectedMonth === "all" ? 5 : 0}
//           />
//           <YAxis
//             domain={yAxisDomain}
//             tickFormatter={(tick) =>
//               new Intl.NumberFormat("en-US").format(tick)
//             }
//           />
//           <Tooltip
//             labelFormatter={(label) =>
//               new Date(label).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })
//             }
//             formatter={(value) => [
//               new Intl.NumberFormat("en-US").format(Number(value)),
//               "Steps",
//             ]}
//           />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="Steps"
//             stroke="#82ca9d"
//             dot={false}
//             strokeWidth={2}
//           />
//           <ReferenceLine
//             y={average}
//             label="Average"
//             stroke="red"
//             strokeDasharray="3 3"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default StepsChart;
import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { loadCSV, FitnessData } from "../utils/DataLoader";
import ChartStats from "./ChartStats";

interface StepsChartProps {
  year: string;
}

const colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
  "#ff7300",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const StepsChart: React.FC<StepsChartProps> = ({ year }) => {
  const [data, setData] = useState<FitnessData[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  useEffect(() => {
    loadCSV(`/data/steps_${year}.csv`).then(setData);
  }, [year]);

  const handleMonthToggle = (month: number) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const processedData = useMemo(() => {
    return data.reduce((acc, item) => {
      const date = new Date(item.Date);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      if (!acc[day]) {
        acc[day] = { day };
      }
      acc[day][`month${month}`] = item.Steps;
      return acc;
    }, {} as { [key: string]: any });
  }, [data]);

  const chartData = Object.values(processedData);

  const maxSteps = Math.max(...data.map((item) => item.Steps || 0));
  const yAxisDomain = [0, Math.ceil(maxSteps / 1000) * 1000];

  const calculateMonthlyAverage = (month: number) => {
    const monthData = data.filter(
      (item) => new Date(item.Date).getMonth() + 1 === month
    );
    const sum = monthData.reduce((acc, item) => acc + (item.Steps || 0), 0);
    return sum / monthData.length;
  };

  return (
    <div>
      <h2 className="subpixel-antialiased tracking-wide leading-loos text-2xl text-emerald-700 mt-6 mb-6">
        Steps {year}
      </h2>
      <div>
        {months.map((month, index) => (
          <label key={index} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={selectedMonths.includes(index + 1)}
              onChange={() => handleMonthToggle(index + 1)}
            />
            {month}
          </label>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={400} className="shadow-md">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            type="number"
            domain={[1, 31]}
            tickFormatter={(tick) => tick.toString()}
          />
          <YAxis
            domain={yAxisDomain}
            tickFormatter={(tick) =>
              new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
              }).format(tick)
            }
          />
          <Tooltip
            formatter={(value: any, name: string) => {
              if (typeof value === "number") {
                const monthNumber = parseInt(name.replace("month", ""));
                return [
                  new Intl.NumberFormat("en-US").format(value),
                  `Steps (${months[monthNumber - 1]})`,
                ];
              }
              return [value, name];
            }}
          />
          {/* <Legend
            onMouseEnter={(e) =>
              setHoveredMonth(parseInt(e.dataKey.replace("month", "")))
            }
            onMouseLeave={() => setHoveredMonth(null)}
          /> */}
          <Legend
            onMouseEnter={(e) => {
              if (e.dataKey && typeof e.dataKey === "string") {
                setHoveredMonth(parseInt(e.dataKey.replace("month", "")));
              }
            }}
            onMouseLeave={() => setHoveredMonth(null)}
          />
          {selectedMonths.map((month, index) => (
            <React.Fragment key={month}>
              <Line
                type="monotone"
                dataKey={`month${month}`}
                name={months[month - 1]}
                stroke={colors[index % colors.length]}
                dot={false}
                strokeWidth={hoveredMonth === month ? 4 : 2}
                opacity={hoveredMonth && hoveredMonth !== month ? 0.3 : 1}
              />
              <ReferenceLine
                y={calculateMonthlyAverage(month)}
                stroke={colors[index % colors.length]}
                strokeDasharray="3 3"
                label={{
                  value: `Avg ${months[month - 1]}`,
                  fill: colors[index % colors.length],
                  fontSize: 10,
                  position: "insideBottomRight",
                }}
              />
            </React.Fragment>
          ))}
        </LineChart>
      </ResponsiveContainer>
      <ChartStats />
    </div>
  );
};

export default StepsChart;
