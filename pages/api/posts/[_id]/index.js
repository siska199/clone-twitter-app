import posts from "../../../../model/posts";
import dbConnect from "../../../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;
  const { _id } = req.query;

  if (method == "GET") {
    try {
      const getUser = await posts.findOne({ _id });
      res.status(200).json(getUser);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  if (method == "PUT") {
    try {
      const updatePost = await posts.findOneAndUpdate({ _id }, body);
      res.status(200).json(updatePost);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  if (method == "DELETE") {
    try {
      const deletePost = await posts.deleteOne({_id})
      req.status(200).json(deletePost)
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
