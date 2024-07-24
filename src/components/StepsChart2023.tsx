// export default StepsChart2023;
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { loadCSV, FitnessData } from "../utils/DataLoader";

interface StepsChartProps {
  year: string;
}

const StepsChart: React.FC<StepsChartProps> = () => {
  const [data, setData] = useState<FitnessData[]>([]);

  useEffect(() => {
    loadCSV(`/data/steps_${2023}.csv`).then(setData);
  }, [2023]);

  const maxSteps = Math.max(...data.map((item) => item.Steps || 0));
  const yAxisDomain = [0, Math.ceil(maxSteps / 5000) * 5000]; // Round up to nearest 5000

  return (
    <div>
      <h2>Steps {2023}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Date"
            tickFormatter={(tick) =>
              new Date(tick).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
            // interval={5} // Show every 5th tick
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
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }
            formatter={(value: number) => [
              new Intl.NumberFormat("en-US").format(value),
              "Steps",
            ]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Steps"
            stroke="#82ca9d"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StepsChart;
