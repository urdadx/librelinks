import { db } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== "GET" ) {
    return res.status(405).end();
  }

  try {
      const { currentUser } = await serverAuth(req, res);
      if(req.method === "POST"){
        const { description } = req.body;
        const newFeedback = await db.feedback.create({
            data: {
                description: description,
                email: currentUser.email
            },
        });

        return res.status(200).json(newFeedback);
      } else if (req.method === "GET"){
          const allFeedback = await db.feedback.findMany();
         return res.status(200).json(allFeedback);
      }

  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
