import apartmentModel from "../mongo/models/apartment.models.js";

class ApartmentService {
  constructor() { }

  // funcion para validar los datos del departamento
  validateApartmentData(apartmentData) {
    const { title, description, price, images, isAvailable } = apartmentData;
    if (!title || !description || !price || !images) {
      throw new Error("Faltan datos");
    }
    if (typeof price !== "number" || price <= 0) {
      throw new Error("El precio debe ser un numero o el valor mayor a 0");
    }
  }

  // funcion para crear un departamento
  async createApartment(apartmentData) {
    try {
      this.validateApartmentData(apartmentData);
      const newApartment = await apartmentModel.create(apartmentData);
      return newApartment;
    } catch (error) {
      console.error("Error al crear el departamento", error);
      throw new Error("service error:" + error);
    }
  }

  //funcion para obtener todos los departamentos
  async getAllApartments() {
    try {
      const allApartments = await apartmentModel.find();
      return allApartments;
    } catch (error) {
      console.error("Error al obtener los departamentos: ", error);
      throw new Error("service error:" + error);
    }
  }

  // funcion para obtener un departamento por id
  async getApartmentById(aid) {
    try {
      const apartmentById = await apartmentModel.findById(aid);
      if (!apartmentById) {
        throw new Error("Departamento no encontrado");
      }
      return apartmentById;
    } catch (error) {
      console.error("Error al encontrar el departamento: ", error);
      throw new Error("service error:" + error);
    }
  }

  //funcion para actualizar un departamento por id
  async updateApartment(aid, apartmentDataToReplace) {
    try {
      // Buscar el departamento existente
      const existingApartment = await apartmentModel.findById(aid);
      if (!existingApartment) {
        throw new Error("Departamento no encontrado");
      }
      // spread operator para fusionar los datos actuales con los nuevos datos
      const updatedApartmentData = {
        ...existingApartment.toObject(),
        ...apartmentDataToReplace,
      };

      // Actualizamos el departamento con los nuevos datos
      const updatedApartment = await apartmentModel.findByIdAndUpdate(
        aid,
        updatedApartmentData,
        { new: true },
      );
      return updatedApartment;
    } catch {
      console.error("Error al actualizar el departamento: ", error);
      throw new Error("service error:" + error);
    }
  }

  // funcion para eliminar un departamento por id

  async deleteApartment(aid) {
    try {
      const apartmentToDelete = await apartmentModel.findByIdAndDelete(aid);
      if (!apartmentToDelete) {
        throw new Error("Departamento no encontrado");
      }
      return apartmentToDelete;
    } catch (error) {
      console.error("Error al eliminar el departamento: ", error);
      throw new Error("service error:" + error);
    }
  }
}

export default ApartmentService;
