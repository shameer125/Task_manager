import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
  title: String,
});


export default mongoose.model("Task", taskSchema, "tasks");
