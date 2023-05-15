import { Schema } from "mongoose"
import { ManagerMongoose } from "./ManagerMongoose.js"

export const cartManager = new ManagerMongoose("carts", {
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ],
        default: []
    },
})