import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {dbName: "reservas"});
    console.log("conectado a base de datos");
  } catch (err) {
    console.error(err);
  }
};
