import posts from "../../../model/posts";
import dbConnection from "../../../lib/dbConnection";

export default async function handler(req, res) {
  await dbConnection();
  const { method } = req;

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
      res.status(200).send("data success");
    } catch (error) {
      res.status(500).send(`${error}`);
    }
  }
}
