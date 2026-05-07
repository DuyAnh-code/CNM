import { NextRequest, NextResponse } from "next/server";
import { guestbookEntries } from "@/data/guestbook";

export async function GET() {
  return NextResponse.json(guestbookEntries);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || !body.message) {
    return NextResponse.json({ error: "Ten va loi nhan la bat buoc" }, { status: 400 });
  }

  const newEntry = {
    id: Date.now().toString(),
    name: body.name,
    message: body.message,
    createdAt: new Date().toISOString(),
  };

  guestbookEntries.unshift(newEntry);
  return NextResponse.json(newEntry, { status: 201 });
}
