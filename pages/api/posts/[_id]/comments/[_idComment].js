import posts from "../../../../../model/posts";
import dbConnect from "../../../../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;
  const { _id } = req.query;

  if (method == "PUT") {
    const getPost = await posts.findOne({ _id });
    const user = getPost.comments.filter((data) => data.user == body.user);
    user[0]
      ? getPost.comments.pull({ _id: user[0].id })
      : getPost.comments.push(body);

    await getPost.save();
    res.status(201).json(getPost);
  }
}
