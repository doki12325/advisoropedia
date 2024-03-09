import User from "@models/User";
import { connectToDb } from "@utils/database";
import { generateToken } from "@utils/generateToken";

export const POST = async (req) => {
  const { email, password, username } = await req.json();
  if (!email || !password || !username) {
    return new Response(
      JSON.stringify({ message: "Requested Details Not Provided" }),
      { status: 400 }
    );
  }
  await connectToDb();
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 400,
    });
  }
  const user = new User({ email, password, username });
  await user.save();

  const token = generateToken(user._id);

  const newuser = { ...user._doc, token };

  return new Response(JSON.stringify(newuser), { status: 200 });
};
