import mongoose from "mongoose";

const rentalCollection = "Rental";

//este schema deberia tener como uno de sus atributos la fecha de inicio y fin de arriendo del apartamento
const rentalSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  // tentant: { type: mongoose.Schema.Types.ObjectId, ref: "Gest" },
  //price: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const rentalModel = mongoose.model(rentalCollection, rentalSchema);

export default rentalModel;
