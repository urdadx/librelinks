import serverAuth from "@/lib/serverAuth";
import { db } from "@/lib/db";

export default async function handler(req, res) {
	if (req.method !== "POST" && req.method !== "GET") {
		return res.status(405).end();
	}

	try {
		if (req.method === "POST") {
			const { currentUser } = await serverAuth(req, res);
			const { title, url, order } = req.body;

			const link = await db.link.create({
				data: {
					title,
					url,
					order,
					userId: currentUser.id,
				},
			});

			return res.status(200).json(link);
		}

		if (req.method === "GET") {
			const { userId } = req.query;

			let links;

			if (userId && typeof userId === "string") {
				links = await db.link.findMany({
					where: {
						userId,
					},
					include: {
						user: true,
					},
					orderBy: {
						createdAt: "desc",
					},
				});
			}

			return res.status(200).json(links);
		}
	} catch (error) {
		return res.status(400).end();
	}
}
