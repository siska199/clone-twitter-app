import posts from "../../../model/posts";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  if (method == "GET") {
    try {
      const data = await posts.find().populate("user").sort("-createdAt");
      res.status(200).json(data);
    } catch (error) {
      console.log(error)
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
