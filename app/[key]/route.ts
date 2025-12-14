import { getOriginalUrl } from "@/app/actions/shorten";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;

  // Ignore favicon and common static files
  if (
    key === "favicon.ico" ||
    key.startsWith("_next") ||
    key.startsWith("static")
  ) {
    return new NextResponse(null, { status: 404 });
  }

  const url = await getOriginalUrl(key);

  if (url) {
    redirect(url);
  }

  return NextResponse.json({ error: "Link not found" }, { status: 404 });
}

