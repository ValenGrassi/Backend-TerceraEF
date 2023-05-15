export class DatosFuturoCarrito{
    constructor(products, quantity){
        if (products == undefined){
            this.product = []
        } else{this.product = products._id}
        this.quantity = quantity
    }
}

