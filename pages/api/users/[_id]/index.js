import users from "../../../../model/users";
import dbConnect from "../../../../lib/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  const { body, method } = req;
  const { _id } = req.query;

  if (method == "PUT") {
    try {
      const userUpdate = await users.findOneAndUpdate({ _id }, body);
      res.status(201).json(`Update user success : ${userUpdate}`);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  if (method == "DELETE") {
    try {
      const userDelete = await users.deleteOne({ _id });
      res.status(200).json(`Delete user success: ${userDelete}`);
    } catch (error) {
      resizeBy.status(500).send(error);
    }
  }
}
