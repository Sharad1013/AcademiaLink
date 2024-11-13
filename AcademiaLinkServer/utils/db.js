import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({});

const mongodbConnect = async () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log(`Database Connection Successfull!! Synchronizing all Data`);
    })
    .catch((error) => {
      console.log(`MongoDB Connection Error : ${error}`);
    });
};

export default mongodbConnect;
