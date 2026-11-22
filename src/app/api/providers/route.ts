import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  try {
    const orgs = await prisma.organization.findMany({
      include: { models: true, providers: { include: { model: true } } },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ success: true, data: orgs });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}