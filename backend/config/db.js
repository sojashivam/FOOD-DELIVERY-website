import mongoose, { modelNames } from "mongoose";

 export const connectDB = async () => {

    await mongoose.connect('mongodb+srv://newbiehustler49:gY4MKx8JPpwjEVTV@cluster0.akm5w.mongodb.net/Maharaja').then(()=>console.log("DB Connected"));
    
}
