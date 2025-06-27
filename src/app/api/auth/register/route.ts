import { connectDB } from "@/lib/mongoose";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    await connectDB();

    const exists = await User.findOne({ email });
    if (exists)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    return NextResponse.json({ message: "Registered" }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
