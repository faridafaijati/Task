import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  const uri = process.env.MONGODB_URI || '';
  const status = mongoose.connection.readyState;
  
  // Try to ping if not connected
  if (status !== 1) {
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      return NextResponse.json({ 
        connected: true, 
        message: 'Successfully connected to MongoDB Atlas',
        ip: '182.8.249.252' 
      });
    } catch (error: any) {
      return NextResponse.json({ 
        connected: false, 
        error: error.message,
        ip: '182.8.249.252',
        tip: 'Ensure this IP is whitelisted in MongoDB Atlas Network Access.'
      }, { status: 500 });
    }
  }

  return NextResponse.json({ 
    connected: true, 
    message: 'Connected', 
    ip: '182.8.249.252' 
  });
}
