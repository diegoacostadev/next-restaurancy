import type {NextRequest} from "next/server";

import {revalidatePath} from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/";
  const secret = request.nextUrl.searchParams.get("secret");

  if (!secret || secret != process.env.REVALIDATE_SECRET) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: "Missing secret",
    });
  }

  revalidatePath(path);

  return Response.json({success: true});
}
