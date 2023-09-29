import Idea from "@models/idea";
import { connectToDB } from "@utils/database";

// GET idea
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const idea = await Idea.findById(params.id).populate("creator");

    if (!idea) return new Response("Idea not fount", { status: 404 });
    return new Response(JSON.stringify(ideas), { status: 200 });
  } catch (error) {
    console.log("DB Get Ideas error: " + error);
    return new Response("Failed to retrieve all Ideas", { status: 500 });
  }
};

// PATCH - update idea
export const PATCH = async (request, { params }) => {
  const { idea, tag } = await request.json();

  try {
    await connectToDB();
    const ideaToUpdate = await Idea.findById(params.id).populate("creator");

    if (!ideaToUpdate)
      return new Response("Idea to update not fount", { status: 404 });
    ideaToUpdate.idea = idea;
    ideaToUpdate.tag = tag;

    await ideaToUpdate.save();
    return new Response(JSON.stringify(ideaToUpdate), { status: 200 });
  } catch (error) {
    console.log("DB Update Idea error: " + error);
    return new Response("Failed to update Idea", { status: 500 });
  }
};

// DELETE idea
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Idea.findByIdAndRemove(params.id);
    return new Response("Idea deleted successfully", { status: 200 });
  } catch (error) {
    console.log("DB Delete Idea error: " + error);
    return new Response("Failed to delete Idea", { status: 500 });
  }
};
