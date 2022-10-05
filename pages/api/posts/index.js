import posts from "../../../model/posts";
import dbConnect from "../../../lib/dbConnect";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;
export default async function handler(req, res) {
  await dbConnect();
  const token = await getToken({ req, secret });
  const {
    method,
    body,
    query: { page, skip, idUser, loves, comments },
  } = req;
  if (method == "GET") {
    try {
      const skipState = skip ? JSON.parse(skip) : false;
      const pageState = page ? JSON.parse(page) : 1;
      const lovesState = loves ? JSON.parse(loves) : false;
      const commentsState = comments ? JSON.parse(comments) : false;
      const limit = 5;
      const filter = {
        user: ObjectId(idUser),
      };
      if (lovesState) filter["likes.user"] = ObjectId(idUser);
      if (commentsState) filter["comments.user"] = ObjectId(idUser);

      const data = await posts
        .find(idUser && filter)
        .populate("user")
        .sort("-createdAt")
        .skip(skipState ? (pageState - 1) * limit : 0)
        .limit(skipState ? limit : false)
        .lean()
        .exec();

      const totalData = await posts.countDocuments();
      const modifiedData = data.map((post) => {
        return {
          ...post,
          likeData: token
            ? post.likes.filter((like) => like.user == token.id)[0]
            : "",
        };
      });
      res.status(200).json({
        data: modifiedData,
        hasMore: skipState
          ? totalData >= pageState * limit
            ? true
            : false
          : false,
        page: pageState + 1,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(`${error}`);
    }
  }

  if (method == "POST") {
    try {
      const createPost = await posts.create({
        ...body,
        user: token.id,
      });
      res.status(200).send(createPost);
    } catch (error) {
      res.status(500).send(`${error}`);
    }
  }
}
