import users from "../../../model/users";
import clientPromise from "../../../lib/dbClientPromise";

export default async function handler(req, res) {
  await clientPromise;
  const { method } = req;
  if (method == "GET") {
    const getUsers = await users.find();
    res.status(200).json(getUsers);
  }
  if (method == "POST") {
  }
}
