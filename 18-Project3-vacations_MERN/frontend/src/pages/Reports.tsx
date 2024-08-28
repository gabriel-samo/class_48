import { CSVLink } from "react-csv";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { makeRequest } from "../utils/makeRequest";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Button } from "flowbite-react";
import moment from "moment";

function Reports() {
  const currentUser = useAppSelector((state) => state.currentUser);
  const isDarkMode = useAppSelector((state) => state.theme.theme === "dark");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    makeRequest(currentUser.token)
      .get("/api/vacations/reports")
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pt-10 min-h-screen bg-gray-200 dark:bg-gray-700">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="mt-4 text-4xl font-bold text-center text-blue-600 dark:text-blue-200">
          Vacation Reports
        </h1>
        <Button outline color="purple">
          <CSVLink
            filename={`${moment().format("DD-MM-YYYY")}-reports.csv`}
            headers={[
              { label: "Destination", key: "destination" },
              { label: "Followers", key: "followers" }
            ]}
            data={reports}
          >
            Download CSV Report
          </CSVLink>
        </Button>
      </div>
      <div className="w-[90%] h-[30rem] mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={reports}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDarkMode ? "#94a3b8" : "#64748b"}
            />
            <XAxis
              dataKey="destination"
              tick={{ fill: isDarkMode ? "#fff" : "#000" }}
              axisLine={{ stroke: isDarkMode ? "#fff" : "#000" }}
            />
            <YAxis
              tick={{ fill: isDarkMode ? "#fff" : "#000" }}
              axisLine={{ stroke: isDarkMode ? "#fff" : "#000" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="followers" fill="#8b5cf6" name="Followers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Reports;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 dark:bg-slate-900 bg-slate-100 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg font-bold dark:text-indigo-400 text-indigo-800">
          {label}
        </p>
        <p className="text-sm dark:text-indigo-400 text-indigo-800">
          Followers:
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
};
