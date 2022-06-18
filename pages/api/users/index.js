import users from "../../../model/users";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  if (method == "GET") {
    const getUsers = await users.find();
    res.status(200).json(getUsers);
  }
  if (method == "POST") {
  }
}
