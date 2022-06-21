import posts from "../../../../../model/posts";
import dbConnect from "../../../../../lib/dbConnect";

const secret = process.env.JWT_SECRET;
export default async function handler(req, res) {
  await dbConnect();
  const { method, body } = req;
  const { _id } = req.query;
  const token = await getToken({ req, secret });

  if (method == "POST") {
    const getPost = await posts.findOne({ _id });

    // const user = getPost.likes.filter((data) => data.user == body.user);
    // user[0]
    //   ? getPost.likes.pull({ _id: user[0].id })
    //   :
    getPost.likes.push({
      ...body,
      user: token.id,
    });

    await getPost.save();
    res.status(201).json(getPost);
  }
}
