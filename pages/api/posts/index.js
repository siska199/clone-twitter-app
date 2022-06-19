import posts from "../../../model/posts";
import dbConnect from "../../../lib/dbConnect";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;
export default async function handler(req, res) {
  await dbConnect();
  const token = await getToken({ req, secret });
  const { method } = req;

  if (method == "GET") {
    try {
      const data = await posts
        .find()
        .populate("user")
        .sort("-createdAt")
        .lean();

      const modData = data.map((post) => ({
        ...post,
        like: post.likes.filter((like) =>like.user==token.id)[0]
          ? true
          : false,
      }));

      res.status(200).json(token ? modData : data);
    } catch (error) {
      console.log(error);
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
