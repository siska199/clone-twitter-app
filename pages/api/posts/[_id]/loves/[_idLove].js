import posts from "../../../../../model/posts";
import dbConnect from "../../../../../lib/dbConnect";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;
export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const { _id, _idLove } = req.query;
  const token = await getToken({ req, secret });

  if (method == "DELETE") {
    try {
      const getPost = await posts.findOne({ _id });
      getPost.likes.pull({ _id: _idLove });
      await getPost.save();

      res
        .status(200)
        .send(`Delete love of user ${token.id} of post widtt ${_id} success`);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
