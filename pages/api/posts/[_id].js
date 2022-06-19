import posts from "../../../model/posts";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;
  const { _id } = req.query;

  if (method == "GET") {
    try {
      
      const getUser = await posts.findOne({ _id });
      res.status(200).json(getUser);
    } catch (error) {
      res.status(500).send(error)
    }
  }
  if (method == "PUT") {
    //check userdenganID ini ada atau tidak di user.likes
  }
}
