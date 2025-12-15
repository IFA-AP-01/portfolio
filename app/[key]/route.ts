import { getOriginalUrl } from "@/app/actions/shorten";
import { NextRequest, NextResponse } from "next/server";
import PostHogClient from "../posthog";

export const dynamic = "force-dynamic";

function getIp(request: NextRequest): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",").pop()!.trim();
  }

  return (request as any).ip || "127.0.0.1";
}

async function getGeoData(ip: string) {
  try {
    const res = await fetch(
      `https://api.ipinfo.io/lite/${ip}?token=${process.env.IPINFO_TOKEN}`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;

  if (
    key === "favicon.ico" ||
    key.startsWith("_next") ||
    key.startsWith("static")
  ) {
    return new NextResponse(null, { status: 404 });
  }

  const url = await getOriginalUrl(key);

  if (url) {
    const posthog = PostHogClient();
    const ip = getIp(request);
    const geoData = await getGeoData(ip);

    posthog.capture({
      distinctId: key,
      event: "short_link_redirected",
      properties: {
        short_key: key,
        destination_domain: new URL(url).hostname,
        referer: request.headers.get("referer"),
        user_agent: request.headers.get("user-agent"),
        $ip: ip,
        ...geoData,
      },
    });

    return NextResponse.redirect(url, 302);
  }

  return NextResponse.json({ error: "Link not found" }, { status: 404 });
}
