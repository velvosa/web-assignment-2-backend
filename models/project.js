import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: String,
    completion: Date,
    description: String,
    image: String
});

export default mongoose.model("Project", projectSchema);