import Idea from "@models/idea";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const ideas = await Idea.find({creator: params.id}).populate("creator");
    return new Response(JSON.stringify(ideas), { status: 200 });
  } catch (error) {
    console.log("DB Get Ideas error: " + error);
    return new Response("Failed to retrieve all Ideas", { status: 500 });
  }
};
