import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://gofood:Arul21012004@cluster0.fxnix.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}