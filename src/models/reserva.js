import mongoose from "mongoose";

const appointmentCollection = "appointment";

//este schema deberia tener como uno de sus atributos la fecha de inicio y fin de arriendo del apartamento
const appointmentSchema = new mongoose.Schema({
  location: String,
  price: Number,
  image: String,
  startDate: Date,
  endDate: Date,
});

const appointmentModel = mongoose.model(
  appointmentCollection,
  appointmentSchema,
);

export default appointmentModel;
