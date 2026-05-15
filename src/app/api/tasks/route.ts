import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Task } from '@/models';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    let query: any = {};
    if (category) query.category = category;
    if (status) query.status = status;

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const task = await Task.create(data);
    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
