import Post from "@models/Post";
import { verifyUser } from "@utils/verifyUser";

export const GET = async (req) => {
  try {
    if (!verifyUser(req)) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || 1;

    const posts = await Post.find()
      .limit(10)
      .skip((page - 1) * 10)
      .sort({ createdAt: "desc" });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (e) {
    return new Response(e, { status: 500 });
  }
};
