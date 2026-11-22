import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search") || "";
    const org = req.nextUrl.searchParams.get("org");
    const modality = req.nextUrl.searchParams.get("modality");
    const type = req.nextUrl.searchParams.get("type");
    const sort = req.nextUrl.searchParams.get("sort") || "featured";
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (org && org !== "all") where.organization = { slug: org };
    if (type && type !== "all") where.type = type;
    if (modality && modality !== "all") where.modalities = { has: modality };
    let orderBy: any = { isFeatured: "desc" };
    if (sort === "price-low") orderBy = { inputPricePerM: "asc" };
    if (sort === "price-high") orderBy = { inputPricePerM: "desc" };
    if (sort === "context") orderBy = { contextWindow: "desc" };
    if (sort === "newest") orderBy = { releaseDate: "desc" };
    const models = await prisma.model.findMany({
      where,
      orderBy,
      include: {
        organization: true,
        scores: { include: { benchmark: true } },
        providers: { include: { organization: true } },
      },
    });
    return NextResponse.json({ success: true, count: models.length, data: models });
  } catch (error: any) {
    if (error?.digest?.startsWith?.("NEXT_")) throw error;
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}