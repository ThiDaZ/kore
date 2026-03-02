import { NextRequest, NextResponse } from "next/server";
import { auth } from "./server/auth/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest): Promise<NextResponse> {
	const { pathname } = request.nextUrl;

	// Check if the Better Auth session cookie is present
	const session = await auth.api.getSession({ headers: await headers() });

	// filter unauthenticated users
	if (!session) {
		if (pathname === "/") return NextResponse.next();
		return NextResponse.redirect(new URL("/", request.url));
	}

	// authenticated users hitting the login page
	if (pathname === "/") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

// Crucial: Tell Next.js which routes require this check!
export const config = {
	matcher: [
		"/",
		"/dashboard/:path*", // Protects /dashboard and everything under it
		// Add any other protected routes here
	],
};
