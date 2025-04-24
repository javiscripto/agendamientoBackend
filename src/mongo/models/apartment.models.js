import mongoose from "mongoose";

const propertyCollection = "Property";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//virtuals para obtener todos los arriendos de un departamento
propertySchema.virtual("rentals", {
  ref: "Rental",
  localField: "_id",
  foreignField: "property",
  justOne: false,
});

//metodo para obtener fechas reservadas de un departamento
propertySchema.methods.getBookedDates = async function() {
  const rentals = await mongoose
    .model("Rental")
    .find({
      property: this._id,
      endDate: { $gte: new Date() },
    })
    .select("startDate endDate -_id");

  return rentals;
};
const apartmentModel = mongoose.model(propertyCollection, propertySchema);

export default apartmentModel;
