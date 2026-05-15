import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Note } from '@/models';

export async function GET() {
  try {
    await connectDB();
    const notes = await Note.find({}).sort({ updatedAt: -1 });
    return NextResponse.json(notes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const note = await Note.create(data);
    return NextResponse.json(note, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
