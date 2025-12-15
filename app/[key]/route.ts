import { getOriginalUrl } from "@/app/actions/shorten";
import { NextRequest, NextResponse } from "next/server";
import PostHogClient from "../posthog";

export const dynamic = "force-dynamic";

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

    posthog.capture({
      distinctId: key,
      event: "short_link_redirected",
      properties: {
        short_key: key,
        destination_domain: new URL(url).hostname,
        referer: request.headers.get("referer"),
        user_agent: request.headers.get("user-agent"),
      },
    });
    await posthog.shutdown()

    return NextResponse.redirect(url, 302);
  }

  return NextResponse.json({ error: "Link not found" }, { status: 404 });
}
