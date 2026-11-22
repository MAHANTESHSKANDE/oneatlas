import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const model = await prisma.model.findUnique({
      where: { slug: params.slug },
      include: {
        organization: true,
        scores: { include: { benchmark: true } },
        providers: { include: { organization: true } },
      },
    });
    if (!model) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: model });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}