import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
/* create a user router */
/* Router is a function that makes our code modular  
instead of having all routes in server.js, we can define multiple 
files to have our routers */
// creating instance 
const userRouter = express.Router();

userRouter.get(
    '/seed',expressAsyncHandler(async (req, res) => {
      const createdUsers = await User.insertMany(data.users);
      res.send({ createdUsers });
    })
  );


export default userRouter;