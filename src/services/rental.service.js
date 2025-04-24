import rentalModel from "../mongo/models/rental.models.js";
class ValidateData {
  constructor({ startDate, endDate, price, tentant, property }) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.tentant = tentant;
    this.property = property;
  }
  validate() {
    if (
      !this.startDate ||
      !this.endDate ||
      !this.price ||
      !this.tentant ||
      !this.property
    ) {
      throw new Error("Faltan datos");
    }
    if (typeof this.price !== "number" || this.price <= 0) {
      throw new Error("El precio debe ser un numero o el valor mayor a 0");
    }
  }
}

export default class RentalService {
  constructor() { }

  validateData = new ValidateData(rentalData);

  newRental = async (rentalData) => {
    try {
      validateData.validate();
      const newRental = await rentalModel.create(rentalData);
      return newRental;
    } catch (error) {
      console.error("ha ocurrido un error: ", error);
    }
  };
}
