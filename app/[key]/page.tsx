import { getOriginalUrl } from "@/app/actions/shorten";
import { notFound, redirect } from "next/navigation";
import PostHogClient from "../posthog";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

function getIp(headers: Headers): string {
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",").pop()!.trim();
  }

  return "127.0.0.1";
}

async function getGeoData(ip: string) {
  try {
    const res = await fetch(
      `https://api.ipinfo.io/lite/${ip}?token=${process.env.IPINFO_TOKEN}`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function ShortLinkPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;

  if (
    key === "favicon.ico" ||
    key.startsWith("_next") ||
    key.startsWith("static")
  ) {
    notFound();
  }

  const url = await getOriginalUrl(key);

  if (!url) {
    notFound();
  }

  const headerList = await headers();
  const posthog = PostHogClient();
  const ip = getIp(headerList);
  const geoData = await getGeoData(ip);

  posthog.capture({
    distinctId: key,
    event: "short_link_redirected",
    properties: {
      short_key: key,
      destination_domain: new URL(url).hostname,
      referer: headerList.get("referer"),
      user_agent: headerList.get("user-agent"),
      $ip: ip,
      ...geoData,
    },
  });

  redirect(url);
}
