"use client";

import React, { useState, Fragment } from "react";
import yaml from "js-yaml";
import { xml2json, json2xml } from "xml-js";
import { toast } from "react-hot-toast";
import { encode as toonEncode, decode as toonDecode } from "@toon-format/toon";

import { ToonDecodeOptions } from "./components/ToonDecodeOptions";
import { ToonEncodeOptions } from "./components/ToonEncodeOptions";
import { TokenStats } from "./components/TokenStats";

type Format = "json" | "xml" | "yaml" | "toon";

export default function JsonConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [inputFormat, setInputFormat] = useState<Format>("json");
  const [outputFormat, setOutputFormat] = useState<Format>("toon");
  const [error, setError] = useState<string | null>(null);
  const [tokensSaved, setTokensSaved] = useState<number | null>(null);
  const [toonTokens, setToonTokens] = useState<number>(0);
  const [jsonTokens, setJsonTokens] = useState<number>(0);

  // Options State
  const [decodeIndent, setDecodeIndent] = useState<number>(2);
  const [decodeStrict, setDecodeStrict] = useState<boolean>(true);
  const [decodeExpandPaths, setDecodeExpandPaths] = useState<"off" | "safe">(
    "off"
  );

  const [encodeIndent, setEncodeIndent] = useState<number>(2);
  const [encodeKeyFolding, setEncodeKeyFolding] = useState<"off" | "safe">(
    "off"
  );
  const [encodeFlattenDepth, setEncodeFlattenDepth] = useState<
    number | undefined
  >(undefined);
  const [encodeDelimiter, setEncodeDelimiter] = useState<string>(",");

  // Simple token estimator: ~4 characters per token
  const estimateTokens = (text: string) => Math.ceil(text.length / 4);

  const handleConvert = () => {
    setError(null);
    setTokensSaved(null);
    try {
      let jsonObj;

      // Parse Input to Object
      if (inputFormat === "json") {
        jsonObj = JSON.parse(input);
      } else if (inputFormat === "yaml") {
        jsonObj = yaml.load(input);
      } else if (inputFormat === "xml") {
        const jsonStr = xml2json(input, { compact: true, spaces: 2 });
        jsonObj = JSON.parse(jsonStr);
      } else if (inputFormat === "toon") {
        jsonObj = toonDecode(input, {
          indent: decodeIndent,
          strict: decodeStrict,
          expandPaths: decodeExpandPaths,
        });
      }

      // Convert Object to Output
      let result = "";
      if (outputFormat === "json") {
        result = JSON.stringify(jsonObj, null, 2);
      } else if (outputFormat === "yaml") {
        result = yaml.dump(jsonObj);
      } else if (outputFormat === "xml") {
        result = json2xml(JSON.stringify(jsonObj), {
          compact: true,
          spaces: 2,
          fullTagEmptyElement: true,
        });
      } else if (outputFormat === "toon") {
        result = toonEncode(jsonObj, {
          indent: encodeIndent,
          delimiter: encodeDelimiter as any,
          keyFolding: encodeKeyFolding,
          flattenDepth:
            encodeFlattenDepth === undefined ? Infinity : encodeFlattenDepth,
        });
      }

      setOutput(result);

      // Calculate Token Savings if TOON is involved or requested
      if (jsonObj) {
        const jsonString = JSON.stringify(jsonObj, null, 2);
        // For comparison, use default options or current options?
        // Let's use current options for fairness in what the user sees
        const toonString = toonEncode(jsonObj, {
          indent: encodeIndent,
          delimiter: encodeDelimiter as any,
          keyFolding: encodeKeyFolding,
          flattenDepth:
            encodeFlattenDepth === undefined ? Infinity : encodeFlattenDepth,
        });

        const jTokens = estimateTokens(jsonString);
        const tTokens = estimateTokens(toonString);

        setJsonTokens(jTokens);
        setToonTokens(tTokens);
        setTokensSaved(jTokens - tTokens);
      }

      toast.success("Converted successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Conversion failed");
      toast.error("Conversion failed: " + (err.message || "Unknown error"));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  return (
    <Fragment>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center bg-[#FEF3C0] dark:bg-[#252526] p-4 neo-border neo-shadow">
            <h2 className="font-bold text-lg">Input</h2>
            <select
              value={inputFormat}
              onChange={(e) => setInputFormat(e.target.value as Format)}
              className="neo-border px-2 py-1 bg-gray-100 dark:bg-gray-800"
            >
              <option value="json">JSON</option>
              <option value="yaml">YAML</option>
              <option value="xml">XML</option>
              <option value="toon">TOON</option>
            </select>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your ${inputFormat.toUpperCase()} here...`}
            className="w-full h-64 sm:h-96 p-4 font-mono text-sm neo-border hover:neo-shadow resize-none focus:outline-none bg-white dark:bg-[#1d1d20] dark:text-white"
          />

          {/* TOON Decode Options */}
          {inputFormat === "toon" && (
            <ToonDecodeOptions
              indent={decodeIndent}
              setIndent={setDecodeIndent}
              strict={decodeStrict}
              setStrict={setDecodeStrict}
              expandPaths={decodeExpandPaths}
              setExpandPaths={setDecodeExpandPaths}
            />
          )}
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center bg-[#FEF3C0] dark:bg-[#252526] p-4 neo-border neo-shadow">
            <h2 className="font-bold text-lg">Output</h2>
            <div className="flex gap-2">
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as Format)}
                className="neo-border px-2 py-1 bg-gray-100 dark:bg-gray-800"
              >
                <option value="json">JSON</option>
                <option value="yaml">YAML</option>
                <option value="xml">XML</option>
                <option value="toon">TOON</option>
              </select>
              <button
                onClick={copyToClipboard}
                className="neo-button text-sm px-3 py-1 bg-[#E9945B]"
                title="Copy to Clipboard"
              >
                Copy
              </button>
            </div>
          </div>

          <textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            className="w-full h-64 sm:h-96 p-4 font-mono text-sm neo-border hover:neo-shadow resize-none focus:outline-none bg-gray-50 dark:bg-[#1d1d20] dark:text-white"
          />

          {/* TOON Encode Options */}
          {outputFormat === "toon" && (
            <ToonEncodeOptions
              indent={encodeIndent}
              setIndent={setEncodeIndent}
              delimiter={encodeDelimiter}
              setDelimiter={setEncodeDelimiter}
              keyFolding={encodeKeyFolding}
              setKeyFolding={setEncodeKeyFolding}
              flattenDepth={encodeFlattenDepth}
              setFlattenDepth={setEncodeFlattenDepth}
            />
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleConvert}
          className="neo-button text-xl px-12 py-4 bg-[#E9945B] text-black dark:text-white dark:bg-[#E9945B]"
        >
          CONVERT
        </button>
      </div>

      {/* Token Savings Section */}
      {tokensSaved !== null && (
        <TokenStats
          tokensSaved={tokensSaved}
          jsonTokens={jsonTokens}
          toonTokens={toonTokens}
        />
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 border-2 border-red-500 text-red-700 font-bold neo-shadow max-w-2xl w-full">
          Error: {error}
        </div>
      )}
    </Fragment>
  );
}
