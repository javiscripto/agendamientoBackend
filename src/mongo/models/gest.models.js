import mongoose from "mongoose";

const gestCollection = "Gest";

const gestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, lowecase: true, trim: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  rental: { type: mongoose.Schema.Types.ObjectId, ref: "Rental" },
});

const gestModel = mongoose.model(gestCollection, gestSchema);

export default gestModel;