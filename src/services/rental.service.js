import rentalModel from "../mongo/models/rental.models.js";
import apartmentModel from "../mongo/models/apartment.models.js";

export default class RentalService {
  constructor() { }

  createRental = async (rentalData) => {
    try {
      const apartment = await apartmentModel.findById(rentalData.property);
      if (!apartment) {
        throw new Error("Departamento no encontrado");
      } else if (apartment.isAvailable === false) {
        throw new Error("Departamento no disponible");
      }
      //actualizar la disponibilidad del departamento
      apartment.isAvailable = false;
      await apartment.save();
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
      // actualizar la disponibilidad del departamento
      await apartmentModel.findByIdAndUpdate(rentalToDelete.property, {
        isAvailable: true
      })
      return rentalToDelete;
    } catch (error) {
      console.error("Error al eliminar el arriendo: ", error);
      throw new Error("service error:" + error);
    }
  };
}
