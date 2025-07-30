"use server";
import db from "@/service/prisma";
import bcrypt from "bcrypt"
import { createToken } from "@/session/session";
import { cookies } from "next/headers";

interface User {
name: string;
  email: string;
  password: string;
}

export async function signUpUser(userdata: User) {
  try {
    if (!userdata.email || !userdata.name) {
      return { success: false, message: "Give credentials" };
    }
    const existingUser = await db.user.findUnique({
      where: { email: userdata.email },
    });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userdata.password, salt);
    
    const createdUser = await db.user.create({
      data: {
        name: userdata.name,
        email: userdata.email,
        password: hashedPassword,
      },
    });
    
    const token = await createToken(createdUser);
    const cookieStore = await cookies();
    cookieStore.set("usertoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    return { success: true, message: "User Created" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create user" };
  }
}

export async function signInUser(userdata: User) {
  try {
    if (!userdata.email || !userdata.password) {
      return { success: false, message: "Email and password are required" };
    }
    const user = await db.user.findUnique({
      where: { email: userdata.email },
    });
    if (!user) {
      return { success: false, message: "Invalid Credentials" };
    }
    const isPasswordValid = await bcrypt.compare(
      userdata.password,
      user.password
    );
    if (!isPasswordValid) {
      return { success: false, message: "Invalid Credentials" };
    }
    const token = await createToken(user);
    const cookieStore = await cookies();
    cookieStore.set("usertoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    console.log("Sign in successful for:", user.email);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to sign in" };
  }
}

export async function logOutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('usertoken');
}