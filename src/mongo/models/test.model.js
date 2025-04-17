import mongoose from "mongoose";
//creacion de usuarios ficticios para modo de prueba
const usersCollection = "test collection";
const usersSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
});

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;
