import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids")?.split(",") || [];
    const models = await prisma.model.findMany({
      where: { id: { in: ids } },
      include: {
        organization: true,
        scores: { include: { benchmark: true } },
        providers: { include: { organization: true } },
      },
    });
    return NextResponse.json({ success: true, data: models });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}