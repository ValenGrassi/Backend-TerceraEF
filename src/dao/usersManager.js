import { ManagerMongoose } from "./ManagerMongoose.js"

export const usersManager = new ManagerMongoose("users", {
        username: {type: String ,required: true, index: true},
        password: {type: String ,required: true}, 
})

