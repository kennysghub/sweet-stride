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
// import ChartStats from "./ChartStats";

// interface MilesChartProps {
//   year: string;
// }

// const MilesChart: React.FC<MilesChartProps> = ({ year }) => {
//   const [data, setData] = useState<FitnessData[]>([]);
//   const [selectedMonth, setSelectedMonth] = useState<string>("all");

//   useEffect(() => {
//     loadCSV(`/data/miles_${year}.csv`).then(setData);
//   }, [year]);

//   const filteredData =
//     selectedMonth === "all"
//       ? data
//       : data.filter(
//           (item) =>
//             new Date(item.Date).getMonth() === parseInt(selectedMonth) - 1
//         );

//   const maxMiles = Math.max(...filteredData.map((item) => item.Miles || 0));
//   const yAxisDomain = [0, Math.ceil(maxMiles / 5) * 5]; // Round up to nearest 5

//   const average =
//     filteredData.reduce((sum, item) => sum + (item.Miles || 0), 0) /
//     filteredData.length;

//   return (
//     <div>
//       <h2>Miles {year}</h2>
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
//               typeof tick === "number" ? tick.toFixed(1) : tick
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
//             formatter={(value: any) => {
//               if (typeof value === "number") {
//                 return [value.toFixed(2), "Miles"];
//               }
//               return [value, "Miles"];
//             }}
//           />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="Miles"
//             stroke="#8884d8"
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
//       <ChartStats />
//     </div>
//   );
// };

// export default MilesChart;
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

interface MilesChartProps {
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

const MilesChart: React.FC<MilesChartProps> = ({ year }) => {
  const [data, setData] = useState<FitnessData[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  useEffect(() => {
    loadCSV(`/data/miles_${year}.csv`).then(setData);
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
      acc[day][`month${month}`] = item.Miles;
      return acc;
    }, {} as { [key: string]: any });
  }, [data]);

  const chartData = Object.values(processedData);

  const maxMiles = Math.max(...data.map((item) => item.Miles || 0));
  const yAxisDomain = [0, Math.ceil(maxMiles / 5) * 5];

  const calculateMonthlyAverage = (month: number) => {
    const monthData = data.filter(
      (item) => new Date(item.Date).getMonth() + 1 === month
    );
    const sum = monthData.reduce((acc, item) => acc + (item.Miles || 0), 0);
    return sum / monthData.length;
  };

  return (
    <div>
      <h1 className="subpixel-antialiased tracking-wide leading-loos text-2xl text-emerald-700 mt-6 mb-6">
        Miles {year}
      </h1>
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
      <ResponsiveContainer width="100%" height={400} className="shadow-sm">
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
              typeof tick === "number" ? tick.toFixed(1) : tick
            }
          />
          <Tooltip
            formatter={(value: any, name: string) => {
              if (typeof value === "number") {
                const monthNumber = parseInt(name.replace("month", ""));
                return [value.toFixed(2), `Miles (${months[monthNumber - 1]})`];
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

export default MilesChart;
