import User from "@models/User";
import jsonwebtoken from "jsonwebtoken";
import { connectToDb } from "./database";

export const verifyUser = async (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") // checks whether authorization headers exist
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1]; //extracts the token from the header it exists as Bearer <token>

      const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET); //decodes the token and verifies with secret

      await connectToDb(); //connects to the database
      req.user = await User.findById(decodedToken.id).select("-password"); //finds user with decoded id  and returns info without password

      return true;
    } catch (err) {
      return false;
    }
  }
};
