export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const org = searchParams.get("org");
    const modality = searchParams.get("modality");
    const type = searchParams.get("type");
    const sort = searchParams.get("sort") || "featured";
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
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}