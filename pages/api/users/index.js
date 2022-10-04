import users from "../../../model/users";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const {
    method,
    body,
    query: { q },
  } = req;
  if (method == "GET") {
    try {
      const getUsers = await users.find({
        username: { $regex: q },
      })
      
      res.status(200).json(getUsers);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  if (method == "POST") {
    try {
      const createUser = await users.create(body);
      res.status(201).json(`Create user success: ${createUser}`);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
