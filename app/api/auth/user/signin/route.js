import User from "@models/User";
import { connectToDb } from "@utils/database";
import { generateToken } from "@utils/generateToken";

export const POST = async (req) => {
  const { password, username } = await req.json();
  await connectToDb();
  const user = await User.findOne({ $or: [{ username }, { email: username }] });
  if (user && (await user.matchPassword(password))) {
    return new Response(
      JSON.stringify({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({ message: "Invalid username or password" }),
      { status: 401 }
    );
  }
};
