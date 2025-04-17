import apartmentModel from "../mongo/models/apartment.models.js";
import ApartmentService from "../services/apartment.services.js";

//creando instancia de la clase ApartmentService para usar sus metodos y no tener que instanciarla cada vez que la usemos
const apartmentService = new ApartmentService();

export const createApartment = async (req, res) => {
    try {
        const newApartment = await apartmentService.createApartment(req.body);
        return res.status(201).json({ status: "success", message: "Departamento creado con éxito", payload: newApartment,});
    } catch (error) {
        console.error("Error al crear el departamento: ", error.message);
        return res.status(500).json({status: "error",error: error.message,});
    }
};

// endpoint antiguo sin separacion de responsabilidades(sin service)
/* export const createApartment = async (req, res) => {

    const {title, description, price, images, isAvailable,} = req.body
    if (!title || !description || !price || !images || typeof isAvailable !== "boolean") {
        return res.status(400).json({ status: "error", error: "Faltan datos" });
    };

    if (typeof price !== "number" || price <= 0 ) {
        return res.status(400).json({status: "error", error: "El precio debe ser un numero o el valor mayor a 0"});
    };

    try {
        const apartment = await apartmentModel.create({title, description, price, images, isAvailable,});
        return res.status(201).json({ status: "Succes", message: "Departamento creado con exito", payload: apartment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", error: "Error al crear el departamento" });
    };
}; */

export const getAllApartments = async (req, res) => {
    try {
        const allApartments = await apartmentService.getAllApartments();
        return res.status(200).json({ statud: "Succes", message: "Departamentos encontrados", payload: allApartments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", error: "Error al obtener los departamentos" });
    };
};

export const getApartmentByID = async (req, res) => {

    const { aid } = req.params;
    try {
        /* const apartmentById = await apartmentModel.findById(aid); */
        const apartmentById = await apartmentService.getApartmentById(aid);
        if (!apartmentById) {
            return res.status(500).json({ status: "error", error: "Error departmaneto no encontrado" });
        };
        return res.status(200).json({ status: "Succes", message: "Departamento encontrado", payload: apartmentById });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", error: "Error al encontrar el departamento" });
    };
};

export const updateApartment = async (req, res) => {
    const { aid } = req.params;
    const apartmentDataToReplace = req.body;
    try {
        const updatedApartment = await apartmentService.updateApartment(aid, apartmentDataToReplace);
        if (!updatedApartment) {
            return res.status(404).json({ status: "error", error: "Error departamento no encontrado al intentar actualizar" });
        };
        return res.status(200).json({ status: "success", message: "Departamento actualizado con éxito", payload: updatedApartment });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", error: "Error al actualizar el departamento" });
    };
};

export const deleteApartment = async (req, res) => {
    const { aid } = req.params;
    try {
        const apartmentToDelete = await apartmentService.deleteApartment(aid);
        if (!apartmentToDelete) {
            return res.status(404).json({ status: "error", error: "Error departamento no encontrado al intentar eliminar" });
        };
        return res.status(200).json({ status: "success", message: " Departamento eliminado con éxito", payload: apartmentToDelete });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", error: "Error al intentar eliminar el departamento" });
    };
};

// Investigar tipos de errores y como manejarlos para darle mayor claridad al codigo y a la respuesta al cliente.