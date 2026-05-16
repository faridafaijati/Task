'use server';

import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return { error: 'Please fill all fields' };
  }

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    redirect('/auth/login?success=Account created. Please login.');
  }
}
