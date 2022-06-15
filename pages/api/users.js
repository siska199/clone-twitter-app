import users from "../../model/users";
import dbConnection from "../../lib/dbConnection";

export default async function handler(req, res) {
  await dbConnection();
  const { method } = req;
  if (method == "GET") {
    const getUsers = await users.find();
    console.log(`${getUsers}`);
    res.status(200).json(getUsers);
  }
  if (method == "POST") {
  }
}
