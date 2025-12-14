import React from "react";

interface ToonEncodeOptionsProps {
  indent: number;
  setIndent: (value: number) => void;
  delimiter: string;
  setDelimiter: (value: string) => void;
  keyFolding: "off" | "safe";
  setKeyFolding: (value: "off" | "safe") => void;
  flattenDepth: number | undefined;
  setFlattenDepth: (value: number | undefined) => void;
}

export function ToonEncodeOptions({
  indent,
  setIndent,
  delimiter,
  setDelimiter,
  keyFolding,
  setKeyFolding,
  flattenDepth,
  setFlattenDepth,
}: ToonEncodeOptionsProps) {
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
        <label>Delimiter:</label>
        <select
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
          className="px-1 border border-black text-black"
        >
          <option value=",">Comma (,)</option>
          <option value="|">Pipe (|)</option>
          <option value="	">Tab</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label>Key Folding:</label>
        <select
          value={keyFolding}
          onChange={(e) => setKeyFolding(e.target.value as "off" | "safe")}
          className="px-1 border border-black text-black"
        >
          <option value="off">Off</option>
          <option value="safe">Safe</option>
        </select>
      </div>
      {keyFolding === "safe" && (
        <div className="flex items-center gap-2">
          <label>Flatten Depth:</label>
          <input
            type="number"
            min="0"
            placeholder="Inf"
            value={flattenDepth === undefined ? "" : flattenDepth}
            onChange={(e) => {
              const val = e.target.value;
              setFlattenDepth(val === "" ? undefined : parseInt(val));
            }}
            className="w-16 px-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
          />
        </div>
      )}
    </div>
  );
}
