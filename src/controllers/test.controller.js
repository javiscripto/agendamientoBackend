import Users from "../services/test.service.js";

const users = new Users();

export const createUser = async (req, res) => {
  try {
    const { nombre, correo } = req.body;
    const newUser = await users.createUser({ nombre, correo });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error al crear el usuario:", err);
  }
};

export const getAll = async (req, res) => {
  try {
    const allUsers = await users.getAll();
    res.status(200).json(allUsers);
  } catch (err) {
    console.error("Error al obtener los usuarios:", err);
  }
};
