import mongoose, { modelNames } from "mongoose";

 export const connectDB = async () => {

    await mongoose.connect('mongodb+srv://harshitborana75:NiFv0KD6GT4I6BoP@fooddelivery.hcinxzj.mongodb.net/Maharaja').then(()=>console.log("DB Connected"));
    
}
