import Checkbox from "@/components/common/check-box";
import React from "react";

interface ToonDecodeOptionsProps {
  indent: number;
  setIndent: (value: number) => void;
  strict: boolean;
  setStrict: (value: boolean) => void;
  expandPaths: "off" | "safe";
  setExpandPaths: (value: "off" | "safe") => void;
}

export function ToonDecodeOptions({
  indent,
  setIndent,
  strict,
  setStrict,
  expandPaths,
  setExpandPaths,
}: ToonDecodeOptionsProps) {
  return (
    <div className="bg-[#9E8DFF] neo-shadow p-3 border-2 border-black text-sm flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <label>Indent:</label>
        <select
          value={indent}
          onChange={(e) => setIndent(parseInt(e.target.value) || 2)}
          className="px-1 border border-black text-black"
        >
          <option value={2}>2</option>
          <option value={4}>4</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label>Strict:</label>
        <Checkbox checked={strict} onChange={setStrict} />
      </div>
      <div className="flex items-center gap-2">
        <label>Expand Paths:</label>
        <select
          value={expandPaths}
          onChange={(e) => setExpandPaths(e.target.value as "off" | "safe")}
          className="px-1 border border-black text-black"
        >
          <option value="off">Off</option>
          <option value="safe">Safe</option>
        </select>
      </div>
    </div>
  );
}
