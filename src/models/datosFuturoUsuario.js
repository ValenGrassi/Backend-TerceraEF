import mongoose from "mongoose"

const collection = "user"

const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    password: String,
    rol: {type: String, default: "usuario"}
})

const userModel = mongoose.model(collection,schema)

export default userModel