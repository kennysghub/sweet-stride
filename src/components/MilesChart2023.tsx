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

const MilesChart2023: React.FC = () => {
  const [data, setData] = useState<FitnessData[]>([]);

  useEffect(() => {
    loadCSV("/data/miles_2023.csv").then(setData);
  }, []);

  return (
    <div>
      <h2>Miles 2023</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Miles" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MilesChart2023;
