import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Task } from '@/models';
import { auth } from '@/auth';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = (session.user as any).id;

    const { id } = await params;
    await connectDB();
    const data = await req.json();
    
    const task = await Task.findOneAndUpdate(
      { _id: id, userId }, 
      data, 
      { new: true }
    );
    
    if (!task) return NextResponse.json({ error: 'Task not found or unauthorized' }, { status: 404 });
    return NextResponse.json(task);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = (session.user as any).id;

    const { id } = await params;
    await connectDB();
    
    const task = await Task.findOneAndDelete({ _id: id, userId });
    
    if (!task) return NextResponse.json({ error: 'Task not found or unauthorized' }, { status: 404 });
    return NextResponse.json({ message: 'Task deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
