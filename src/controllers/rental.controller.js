import RentalService from "../services/rental.service.js";

const rentalService = new RentalService();

export const createRental = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const property = req.params.pid;
    const newRental = await rentalService.createRental({
      property,
      startDate,
      endDate,
    });
    res.status(201).json({
      status: "success",
      message: "Arriendo creado con exito",
      payload: newRental,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const getAllRentals = async (req, res) => {
  try {
    const allRentals = await rentalService.getAllRentals();
    res.status(200).json({
      status: "success",
      message: "Arriendos encontrados",
      payload: allRentals,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const getRentalById = async (req, res) => {
  try {
    const { rid } = req.params;
    const rental = await rentalService.getRentalById(rid);
    res.status(200).json({
      status: "success",
      message: "arriendo encontrado",
      payload: rental,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const deleteRental = async (req, res) => {
  try {
    const { rid } = req.params;
    const deletedRental = await rentalService.deleteRental(rid);
    res.status(200).json({
      status: "success",
      message: "Arriendo eliminado con exito",
      payload: deletedRental,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const deleteAllRentals = async (req, res) => {
  try {
    await rentalService.deleteAllRentals();
    res.status(200).json({
      status: "success",
      message: "se han eliminado todos los arriendos",
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
