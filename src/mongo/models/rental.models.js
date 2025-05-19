import mongoose from "mongoose";

const rentalCollection = "Rental";

//este schema deberia tener como uno de sus atributos la fecha de inicio y fin de arriendo del apartamento
const rentalSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    // tentant: { type: mongoose.Schema.Types.ObjectId, ref: "Gest" },
    days: { type: Number, required: true },
    price: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

//middleware para verificar disponibilidad
rentalSchema.pre("save", async function(next) {
  const overlappingRental = await mongoose.model("Rental").findOne({
    property: this.property,
    $or: [
      // { startDate: { $lt: this.endDate }, endDate: { $gt: this.startDate } },
      { startDate: { $lte: this.startDate }, endDate: { $gte: this.endDate } },
    ],
  });

  if (overlappingRental) {
    throw new Error("la propiedad se encuentra reservada");
  }

  next();
});

const rentalModel = mongoose.model(rentalCollection, rentalSchema);

export default rentalModel;
