import usersModel from "../models/test.model.js";

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
}
