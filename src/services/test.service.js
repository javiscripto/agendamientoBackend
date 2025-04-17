/* import usersModel from "../mongo/models/test.model.js";

export default class Users {
  constructor() { }

  createUser = async (userData) => {
    try {
      const newUser = await usersModel.create(userData);
      return newUser;
    } catch (error) {
      console.error("ha ocurrido un error: ", error);
    }
  };

  getAll = async () => {
    try {
      const users = await usersModel.find();
      console.log(users);
      return users;
    } catch (error) {
      console.error("ha ocurrido un error al obtener los usuarios: ", error);
    }
  };
} */

/*   📂 controllers ---2
 ┃ ┗ 📄 user.controller.js   → Recibe la request y llama al service
 ┣ 📂 services --------4
 ┃ ┗ 📄 user.service.js      → Procesa lógica de negocio y usa el modelo
 ┣ 📂 models ----------1
 ┃ ┗ 📄 user.model.js        → Modelo de mongoose
 ┗ 📂 routes ----------3
   ┗ 📄 user.router.js       → Define la ruta y qué controller usa */