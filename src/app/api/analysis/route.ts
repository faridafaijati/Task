import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Task } from '@/models';

export async function GET() {
  try {
    await connectDB();
    
    // Aggregate tasks by day for the last 7 days
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const activityData = await Task.aggregate([
      { $match: { createdAt: { $gte: last7Days } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Aggregate by category
    const categoryData = await Task.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    return NextResponse.json({ activityData, categoryData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
