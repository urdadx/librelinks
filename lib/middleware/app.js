import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function AppMiddleware(req) {
	const { path } = req;
	const session = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET,
	});
	// if there's no session and the path isn't /login or /register, redirect to /login
	if (!session?.email && path !== "/login" && path !== "/register") {
		return NextResponse.redirect(
			new URL(
				`/login${path !== "/" ? `?next=${encodeURIComponent(path)}` : ""}`,
				req.url
			)
		);

		// if there's a session
	} else if (session?.email) {
		return NextResponse.redirect(new URL("/admin", req.url));
	}
	// if the path is /login or /register, redirect to "/"
	else if (path === "/login" || path === "/register") {
		return NextResponse.redirect(new URL("/", req.url));
	}
}
