import { NextRequest, NextResponse } from "next/server";
import { queryNumbers, getDauList, getAllTags } from "@/lib/numbers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  if (searchParams.get("meta") === "1") {
    return NextResponse.json({
      dauList: getDauList(),
      tags: getAllTags(),
    });
  }

  const result = queryNumbers({
    q: searchParams.get("q") ?? undefined,
    dau: searchParams.get("dau") ?? undefined,
    camKet: searchParams.get("camKet") ?? undefined,
    tag: searchParams.get("tag") ?? undefined,
    page: Number(searchParams.get("page") ?? 1),
    pageSize: Number(searchParams.get("pageSize") ?? 24),
  });

  return NextResponse.json(result);
}
