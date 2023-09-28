import Idea from "@models/idea";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, idea, tag } = await req.json();
  try {
    await connectToDB();
    const newIdea = new Idea({ creator: userId, idea: idea, tag: tag });
    await newIdea.save();
    return new Response(JSON.stringify(newIdea), { status: 201 });
  } catch (error) {
    console.log("DB Create Idea error: " + error);
    return new Response("Failed to create a new Idea", { status: 500 });
  }
};
