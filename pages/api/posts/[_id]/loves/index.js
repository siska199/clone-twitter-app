import posts from "../../../../../model/posts";
import dbConnect from "../../../../../lib/dbConnect";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;
export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;
  const { _id } = req.query;
  const token = await getToken({ req, secret });

  if (method == "POST") {
    
    const getPost = await posts.findOne({ _id });
    getPost.likes.push({
      ...body,
      user: token.id,
      like: true,
    });
    await getPost.save();
    res.status(201).json(getPost);
  }
}
