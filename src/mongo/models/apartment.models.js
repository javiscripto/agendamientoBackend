import mongoose from "mongoose";

const propertyCollection = "Property";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
});

const apartmentModel = mongoose.model(propertyCollection, propertySchema);

export default apartmentModel;