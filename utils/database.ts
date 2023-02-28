import mongoose from "mongoose";
const connectDB = async() => {
  try{
    await mongoose.connect(process.env.DB_ADDRESS)
    console.log("Success: Connected to MongoDB")
  } catch(err){
    console.log("Failure: Unconnected from MongoDB")
    throw new Error()
  }
}

export default connectDB
