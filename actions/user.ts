"use server";
import db from "@/service/prisma";
import bcrypt from "bcrypt"
import { createToken} from "@/session/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/session/session";

interface User {
name: string;
  email: string;
  password: string;
  role:string,
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        role: userdata.role, 
      },
    });
    const userForToken = {
      id: createdUser.id,
      email: createdUser.email,
    };
    const token = await createToken(userForToken);
    const cookieStore = await cookies();
    cookieStore.set("usertoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    return { success: true, message: "User Created", user: {
        id:createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role
      } };
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
    const userForToken = {
      id: user.id,
      email: user.email,
    };
    const token = await createToken(userForToken);
    const cookieStore = await cookies();
    cookieStore.set("usertoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    console.log("Sign in successful for:", user.email);

    return { success: true, message: "Signed in successfully",user: {
        id:user.id,
        name: user.name,
        email: user.email,
        role: user.role
      } };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to sign in" };
  }
}

export async function logOutUser() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("usertoken")?.value;
  if(userToken){
 cookieStore.delete('usertoken');
  redirect("/sign-in")
  }
  return
 
}


export async function getUserById(userId: string) {
  try {
    if (!userId) {
      return { success: false, message: "User ID is required" };
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      omit: {
        password: true,
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { 
      success: true, 
      message: "User found successfully", 
      user: user 
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to get user" };
  }
}
export async function getUser() {
  try {
    const userDecrypted = await getSession();
    if (!userDecrypted?.id) {
      return {sucess:false,message:"user not found"}
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const userResponse = await getUserById(userDecrypted.id);
    if (userResponse.success && userResponse.user) {
      return { 
        success: true, 
        user: {
          name: userResponse.user.name,
          role: userResponse.user.role,
          id:userResponse.user.id,
          }
        };
      }
      return { success: false, message: "User not found" };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Failed to get user" };
    }
  }