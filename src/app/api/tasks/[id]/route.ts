import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Task } from '@/models';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await req.json();
    const task = await Task.findByIdAndUpdate(params.id, data, { new: true });
    if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    return NextResponse.json(task);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const task = await Task.findByIdAndDelete(params.id);
    if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    return NextResponse.json({ message: 'Task deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
