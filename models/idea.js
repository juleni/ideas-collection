import { model, models, Schema } from "mongoose";

const IdeaSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  idea: {
    type: String,
    required: [true, "Idea is required!"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required!"],
  },
});

// The "models" object is provided by Mongoose library and stores all the registered models.
// If a model named "Idea" already exists in the "models" object, it assigns that existing
// model to the "Idea" variable.
// If a model named "Idea"does not exist in the "models" object, the "model" function from
// Mongoose is called to create a new model.
// The newly created model is then assigned to the "Idea" variable.
const Idea = models.Idea || model("Idea", IdeaSchema);
export default Idea;
