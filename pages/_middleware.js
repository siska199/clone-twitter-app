import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const autPage = [
    "/profile",
    "/bookmarks",
    "/explore",
    "/messages",
    "/notifications",
    "/lists",
  ];
  const conditionals = autPage.filter((path) => path == pathname)[0];

  if (conditionals) {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV == "production",
    });

    const url = req.nextUrl.clone();
    url.pathname = "/";
    if (!session) return NextResponse.redirect(url);
  }
}
