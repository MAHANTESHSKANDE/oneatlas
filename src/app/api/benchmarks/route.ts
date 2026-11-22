import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  try {
    const benchmarks = await prisma.benchmark.findMany({
      include: {
        scores: {
          orderBy: { score: "desc" },
          include: { model: { include: { organization: true } } },
        },
      },
    });
    return NextResponse.json({ success: true, data: benchmarks });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}