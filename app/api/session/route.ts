import { getSession } from "@/session/session";
import { getUserById } from "@/actions/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userDecrypted = await getSession();
    if (!userDecrypted?.id) {
      return NextResponse.json({ success: false, user: null });
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const userResponse = await getUserById(userDecrypted.id);
    if (userResponse.success && userResponse.user) {
      return NextResponse.json({ 
        success: true, 
        user: {
          name: userResponse.user.name,
          role: userResponse.user.role,
        }
      });
    }

    return NextResponse.json({ success: false, user: null });
  } catch (error) {
    console.error("Session API error:", error);
    return NextResponse.json({ success: false, user: null });
  }
}