import { NextRequest, NextResponse } from "next/server";

const RANGE_MAP = {
  "60m": {
    interval: "60 MINUTE",
    bucket: "toStartOfMinute(timestamp)",
    cache: 60, // seconds
  },
  "24h": {
    interval: "24 HOUR",
    bucket: "toStartOfHour(timestamp)",
    cache: 300,
  },
  "7d": {
    interval: "7 DAY",
    bucket: "toDate(timestamp)",
    cache: 1800,
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const range = searchParams.get("range") as keyof typeof RANGE_MAP;

  if (!key || !RANGE_MAP[range]) {
    return NextResponse.json({ error: "Invalid params" }, { status: 400 });
  }

  const { interval, bucket, cache } = RANGE_MAP[range];

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
              ${bucket} AS time,
              count() AS total
            FROM events
            WHERE
              event = 'short_link_redirected'
              AND properties.short_key = {key}
              AND timestamp >= now() - INTERVAL ${interval}
            GROUP BY time
            ORDER BY time
          `,
          values: { key },
        },
      }),
    }
  );

  const data = await res.json();

  return NextResponse.json(
    data.results.map(([time, total]: [string, number]) => ({
      time,
      total,
    })),
    {
      headers: {
        // CDN cache
        "Cache-Control": `public, s-maxage=${cache}, stale-while-revalidate=${cache * 2}`,
      },
    }
  );
}
