import posts from "../../../model/posts";
import dbConnect from "../../../lib/dbConnect";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;
export default async function handler(req, res) {
  await dbConnect();
  const token = await getToken({ req, secret });
  console.log("token: ", token);
  const { method, body } = req;

  if (method == "GET") {
    try {
      const data = await posts
        .find()
        .populate("user")
        .sort("-createdAt")
        .lean();

      const modifiedData = data.map((post) => {
        return {
          ...post,
          likeData: token
            ? post.likes.filter((like) => like.user == token.id)[0]
            : "",
        };
      });

      console.log("modifiedData: ", modifiedData);
      res.status(200).json(modifiedData);
    } catch (error) {
      console.log(error);
      res.status(500).send(`${error}`);
    }
  }

  if (method == "POST") {
    try {
      console.log("body podt: ", body);
      const createPost = await posts.create(body);
      res.status(200).send(createPost);
    } catch (error) {
      res.status(500).send(`${error}`);
    }
  }
}
