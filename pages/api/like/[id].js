import posts from "../../../model/posts";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;
  const { id } = req.query;

  if (method == "PUT") {
    const getPost = await posts.findOne({ id });

    const user = getPost.likes.filter((data) => data.user == body.user);
    user[0] ? getPost.likes.pull({_id:user[0].id}) : getPost.likes.push(body);

    await getPost.save();
    res.status(201).json(getPost);
  }
}
