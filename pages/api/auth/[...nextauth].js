import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/lib/db";
import NextAuth from "next-auth/next";

export const authOptions = {
	adapter: PrismaAdapter(db),
	session: {
		strategy: "jwt",
	},
	pages: {
		newUser: "/onboarding",
		signIn: "/login",	
		error: "/login",
	},

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
		GitHubProvider({
			clientId: process.env.NODE_ENV === "production" ? process.env.GITHUB_CLIENT_ID : process.env.DEV_GITHUB_CLIENT_ID,
			clientSecret: process.env.NODE_ENV === "production" ? process.env.GITHUB_CLIENT_SECRET : process.env.DEV_GITHUB_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
	],

	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.handle = token.handle;
			}
			return session;
		},

		async jwt({ token, user }) {
			const dbUser = await db.user.findFirst({
				where: {
					email: token.email,
				},
			});

			if (!dbUser) {
				token.id = user.id;
				return token;
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				handle: dbUser.handle,
				buttonStyle: dbUser.buttonStyle,
				themePalette: dbUser.themePalette,
			};
		},


		redirect() {
			return "/admin";
		},
	},
};

export default NextAuth(authOptions);
