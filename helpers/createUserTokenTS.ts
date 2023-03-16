const jwt = require("jsonwebtoken");
import { User } from "../models/UserModel"

export default async function  createUserToken( User: User, req : Request, res : Response) {
  const token = jwt.sign(
    // payload data
    {
      name: User.name,
      id: User._id,
    },
    "nossosecret" // para deixar o token único - usar strings únicas
  );

  // return token
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    userId: User.userId,
  });
};
