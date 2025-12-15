import { NextRequest, NextResponse } from "next/server";

const RANGE_MAP = {
  "60m": { interval: "60 MINUTE", cache: 60 },
  "24h": { interval: "24 HOUR", cache: 300 },
  "7d": { interval: "7 DAY", cache: 1800 },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const range = searchParams.get("range") as keyof typeof RANGE_MAP;

  if (!key || !RANGE_MAP[range]) {
    return NextResponse.json({ error: "Invalid params" }, { status: 400 });
  }

  const { interval, cache } = RANGE_MAP[range];

  const res = await fetch(
    `${process.env.POSTHOG_HOST}/api/projects/${process.env.POSTHOG_PROJECT_ID}/query/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.POSTHOG_PERSONAL_API_KEY}`,
      },
      body: JSON.stringify({
        query: {
          kind: "HogQLQuery",
          query: `
            SELECT
              timestamp,
              properties
            FROM events
            WHERE
              event = 'short_link_redirected'
              AND properties.short_key = {key}
              AND timestamp >= now() - INTERVAL ${interval}
            ORDER BY timestamp DESC
            LIMIT 1000
          `,
          values: { key },
        },
      }),
    }
  );

  const data = await res.json();

  return NextResponse.json(
    data.results.map(
      ([timestamp, properties]: [string, string]) => {
        const p = JSON.parse(properties);
        return {
          timestamp,
          destination_domain: p.destination_domain,
          referer: p.referer,
          user_agent: p.user_agent,
          country: p.country,
        };
      }
    ),
    {
      headers: {
        "Cache-Control": `public, s-maxage=${cache}, stale-while-revalidate=${cache * 2}`,
      },
    }
  );
}
