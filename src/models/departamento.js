import mongoose from "mongoose";

const apartmentCollection = "apartments";

const aparmentSchema = new mongoose.Schema({
  location: String,
  price: Number,
  image: String,
});

const apartmentModel = mongoose.model(apartmentCollection, aparmentSchema);

export default apartmentModel;
