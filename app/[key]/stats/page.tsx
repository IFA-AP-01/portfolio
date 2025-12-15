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

export default function StatsPage() {
  const params = useParams();
  const key = params?.key as string;
  const [range, setRange] = useState<TimeRange>("60m");

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

        {error ? (
          <div className="neo-card p-12 text-center bg-red-100 border-red-500 text-red-600">
            <div className="text-xl font-bold">Failed to load statistics</div>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {/* Timeline Chart */}
            <div className="neo-card p-3 sm:p-6 bg-white dark:bg-[#1a1a1a] md:col-span-2 relative">
              <div className="flex items-center gap-3 mb-6">
                <FaChartLine className="text-2xl text-[#E9945B]" />
                <h2 className="text-xl font-black uppercase">
                  Clicks Over Time
                </h2>
              </div>

              <div className="h-[300px] w-full relative">
                {isLoading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-black/60">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent dark:border-white dark:border-t-transparent" />
                  </div>
                )}

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={processedData.timeline}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                      dataKey="time"
                      tick={{ fill: "#666", fontSize: 12 }}
                      axisLine={{ stroke: "#666" }}
                    />
                    <YAxis
                      width={20}
                      tick={{ fill: "#666", fontSize: 11 }}
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
            <div className="neo-card p-3 sm:p-6 bg-white dark:bg-[#1a1a1a]">
              <div className="flex items-center gap-3 mb-6">
                <FaGlobe className="text-2xl text-blue-500" />
                <h2 className="text-xl font-black uppercase">Top Countries</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold text-gray-400 border-b-2 border-dashed border-gray-200 dark:border-gray-700 pb-2">
                  <span>COUNTRY</span>
                  <span>VISITORS</span>
                </div>
                <div className="space-y-4">
                  {processedData.countries.map((item, index) => {
                    const maxVal = Math.max(
                      ...processedData.countries.map((c) => c.value)
                    );
                    return (
                      <div key={item.name} className="flex flex-col gap-1">
                        <div className="flex justify-between items-end font-bold text-sm">
                          <span className="truncate pr-4">{item.name}</span>
                          <span>{item.value}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-none relative overflow-hidden">
                          <div
                            className="h-full bg-[#0088FE]"
                            style={{ width: `${(item.value / maxVal) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {processedData.countries.length === 0 && (
                    <div className="text-center text-gray-500 py-2">
                      No country data available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Device Stats */}
            <div className="neo-card p-3 sm:p-6 bg-white dark:bg-[#1a1a1a]">
              <div className="flex items-center gap-3 mb-6">
                <FaMobileAlt className="text-2xl text-[#00C49F]" />
                <h2 className="text-xl font-black uppercase">Devices</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold text-gray-400 border-b-2 border-dashed border-gray-200 dark:border-gray-700 pb-2">
                  <span>DEVICE</span>
                  <span>VISITORS</span>
                </div>
                <div className="space-y-4">
                  {processedData.devices.map((item, index) => {
                    const maxVal = Math.max(
                      ...processedData.devices.map((d) => d.value)
                    );
                    return (
                      <div key={item.name} className="flex flex-col gap-1">
                        <div className="flex justify-between items-end font-bold text-sm">
                          <span className="truncate pr-4">{item.name}</span>
                          <span>{item.value}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-none relative overflow-hidden">
                          <div
                            className="h-full bg-[#00C49F]"
                            style={{ width: `${(item.value / maxVal) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {processedData.devices.length === 0 && (
                    <div className="text-center text-gray-500 py-2">
                      No device data available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
