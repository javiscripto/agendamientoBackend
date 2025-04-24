import rentalModel from "../mongo/models/rental.models.js";

export default class RentalService {
  constructor() { }

  createRental = async (rentalData) => {
    try {
      const newRental = await rentalModel.create(rentalData);
      return newRental;
    } catch (error) {
      console.error("Error al crear el arriendo: ", error);
      throw new Error("service error:" + error);
    }
  };

  getAllRentals = async () => {
    try {
      const allRentals = await rentalModel.find().populate("property");
      return allRentals;
    } catch (error) {
      console.error("Error al obtener los arriendos: ", error);
      throw new Error("service error:" + error);
    }
  };

  getRentalById = async (rid) => {
    try {
      const rental = await rentalModel.findById(rid).populate("property");
      if (!rental) {
        throw new Error("Arriendo no encontrado");
      }
      return rental;
    } catch (error) {
      console.error("service error:", error);
      throw new Error("service error:", error);
    }
  };

  deleteRental = async (rid) => {
    try {
      const rentalToDelete = await rentalModel.findByIdAndDelete(rid);
      if (!rentalToDelete) {
        throw new Error("Arriendo no encontrado");
      }
      return rentalToDelete;
    } catch (error) {
      console.error("Error al eliminar el arriendo: ", error);
      throw new Error("service error:" + error);
    }
  };
}
