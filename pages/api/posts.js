import posts from "../../model/posts";
import dbConnection from "../../lib/dbConnection";

export default async function handler(req, res) {
  await dbConnection();
  const { method } = req;

  if (method == "GET") {
    try {
      res.send("Error")
    } catch (error) {
      res.status(500).send(`${error}`);
    }
  }
  if (method == "POST") {
    try {
      const { body } = req;
      const createPost = await posts.create(body);
      console.log(`${createPost}`);
    } catch (error) {
      res.status(500).send(`${error}`);
    }
  }
}
