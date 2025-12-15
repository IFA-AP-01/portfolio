"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  LineChart as OriginalLineChart,
  Line as OriginalLine,
  XAxis as OriginalXAxis,
  YAxis as OriginalYAxis,
  CartesianGrid as OriginalCartesianGrid,
  Tooltip as OriginalTooltip,
  ResponsiveContainer as OriginalResponsiveContainer,
  BarChart as OriginalBarChart,
  Bar as OriginalBar,
  Cell as OriginalCell,
  PieChart as OriginalPieChart,
  Pie as OriginalPie,
} from "recharts";
import { FaGlobe, FaMobileAlt, FaChartLine } from "react-icons/fa";
import { useLinkStats, TimeRange } from "@/hooks/useLinkStats";

const LineChart = OriginalLineChart as any;
const Line = OriginalLine as any;
const XAxis = OriginalXAxis as any;
const YAxis = OriginalYAxis as any;
const CartesianGrid = OriginalCartesianGrid as any;
const Tooltip = OriginalTooltip as any;
const ResponsiveContainer = OriginalResponsiveContainer as any;
const BarChart = OriginalBarChart as any;
const Bar = OriginalBar as any;
const Cell = OriginalCell as any;
const PieChart = OriginalPieChart as any;
const Pie = OriginalPie as any;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function StatsPage() {
  const params = useParams();
  const key = params?.key as string;
  const [range, setRange] = useState<TimeRange>("24h");

  const { data, isLoading, error } = useLinkStats(key, range);

  const processedData = useMemo(() => {
    if (!data || !data.length)
      return { timeline: [], countries: [], devices: [] };

    // Timeline Data
    const timelineMap = new Map<string, number>();
    data.forEach((event) => {
      const date = new Date(event.timestamp);
      let timeKey = "";
      if (range === "60m") {
        timeKey = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      } else if (range === "24h") {
        timeKey = date.toLocaleTimeString([], { hour: "2-digit" }) + ":00";
      } else {
        timeKey = date.toLocaleDateString([], {
          month: "short",
          day: "numeric",
        });
      }
      timelineMap.set(timeKey, (timelineMap.get(timeKey) || 0) + 1);
    });

    const timeline = Array.from(timelineMap.entries()).map(([time, count]) => ({
      time,
      count,
    }));

    // Country Data
    const countryMap = new Map<string, number>();
    data.forEach((event) => {
      const country = event.country || "Unknown";
      countryMap.set(country, (countryMap.get(country) || 0) + 1);
    });
    const countries = Array.from(countryMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    // Device Data (Simple UA parsing)
    const deviceMap = new Map<string, number>();
    data.forEach((event) => {
      const ua = (event.user_agent || "").toLowerCase();
      let device = "Desktop";
      if (ua.includes("android")) device = "Android";
      else if (ua.includes("iphone") || ua.includes("ipad")) device = "iOS";
      else if (ua.includes("mac")) device = "Mac";
      else if (ua.includes("windows")) device = "Windows";
      else if (ua.includes("linux")) device = "Linux";

      deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
    });
    const devices = Array.from(deviceMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));

    return { timeline, countries, devices };
  }, [data, range]);

  return (
    <div className="min-h-screen py-28 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl uppercase text-black dark:text-white mb-2 font-bold">
              Statistics
            </h1>
          </div>

          <div className="flex bg-white dark:bg-[#1a1a1a] p-1 border-2 border-black dark:border-white/20 rounded-none neo-shadow">
            {(["60m", "24h", "7d"] as TimeRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-4 py-2 text-sm font-bold uppercase transition-colors ${
                  range === r
                    ? "bg-[#E9945B] text-black border-2 border-black"
                    : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="neo-card p-12 text-center bg-white dark:bg-[#1a1a1a]">
            <div className="animate-pulse text-xl font-bold flex items-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black"></div>
              Loading stats...
            </div>
          </div>
        ) : error ? (
          <div className="neo-card p-12 text-center bg-red-100 border-red-500 text-red-600">
            <div className="text-xl font-bold">Failed to load statistics</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Timeline Chart */}
            <div className="neo-card p-6 bg-white dark:bg-[#1a1a1a] md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <FaChartLine className="text-2xl text-[#E9945B]" />
                <h2 className="text-xl font-black uppercase">
                  Clicks Over Time
                </h2>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={processedData.timeline}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                      dataKey="time"
                      tick={{ fill: "#666", fontSize: 12 }}
                      axisLine={{ stroke: "#666" }}
                    />
                    <YAxis
                      tick={{ fill: "#666", fontSize: 12 }}
                      axisLine={{ stroke: "#666" }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "2px solid #000",
                        boxShadow: "4px 4px 0px #000",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#E9945B"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        strokeWidth: 2,
                        fill: "#fff",
                        stroke: "#000",
                      }}
                      activeDot={{ r: 6, strokeWidth: 0, fill: "#000" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Country Stats */}
            <div className="neo-card p-6 bg-white dark:bg-[#1a1a1a]">
              <div className="flex items-center gap-3 mb-6">
                <FaGlobe className="text-2xl text-blue-500" />
                <h2 className="text-xl font-black uppercase">Top Countries</h2>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={processedData.countries}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      opacity={0.3}
                      horizontal={false}
                    />
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={100}
                      tick={{ fill: "#666", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "2px solid #000",
                        boxShadow: "4px 4px 0px #000",
                      }}
                    />
                    <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]}>
                      {processedData.countries.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="#000"
                          strokeWidth={2}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Device Stats */}
            <div className="neo-card p-6 bg-white dark:bg-[#1a1a1a]">
              <div className="flex items-center gap-3 mb-6">
                <FaMobileAlt className="text-2xl text-green-500" />
                <h2 className="text-xl font-black uppercase">Devices</h2>
              </div>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={processedData.devices}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({
                        name,
                        percent,
                      }: {
                        name: string;
                        percent: number;
                      }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {processedData.devices.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="#000"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "2px solid #000",
                        boxShadow: "4px 4px 0px #000",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
