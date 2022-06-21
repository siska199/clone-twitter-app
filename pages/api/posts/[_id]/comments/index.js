import posts from "../../../../../model/posts";
import dbConnect from "../../../../../lib/dbConnect";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;
export default async function handler(req, res) {
  await dbConnect();
  const { _id } = req.query;
  const { method, body } = req;
  const token = await getToken({ req, secret });
  if (method == "GET") {
    try {
      const getPost = await posts
        .findOne({ _id })
        .populate("comments.user")
        .select("comments")
        .sort({ "comments.createdAt": -1 })
        .lean();

      const comments = getPost.comments
        .map((comment) => ({
          _id: comment._id,
          image: comment.user.image,
          name: comment.user.name,
          username: comment.user.username,
          tweet: comment.comment,
          createdAt: comment.createdAt,
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      res.status(200).send(comments);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  if (method == "POST") {
    try {
      const getPost = await posts.findOne({ _id });
      getPost.comments.push({
        ...body,
        user: token.id,
      });
      await getPost.save();
      res.status(201).send("add comment success");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
