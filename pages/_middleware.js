import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const autPage = [
    "/home",
    "/profile",
    "/bookmarks",
    "/explore",
    "/messages",
    "/notifications",
    "/lists",
  ];
  const conditionals = autPage.filter((path) => path == pathname)[0];
  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV == "production",
  });

  if (conditionals) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    if (!session) return NextResponse.redirect(url);
  } else if (pathname == "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    if (session) return NextResponse.redirect(url);
  }
}
