import posts from "../../../model/posts";
import clientPromise from "../../../lib/dbClientPromise";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  await clientPromise;
  const { method } = req;
  const secret = process.env.JWT_SECRET;
  const token = await getToken({ req, secret });
  console.log("token decrypt: ", token);

  if (method == "GET") {
    try {
      const data = await posts.find().populate("user");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).send(`${error}`);
    }
  }
  if (method == "POST") {
    try {
      const { body } = req;
      const createPost = await posts.create(body);
      res.status(200).send(createPost);
    } catch (error) {
      res.status(500).send(`${error}`);
    }
  }
}
