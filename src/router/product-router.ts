import { BaseRouter } from "./base-router"
import { ProductController } from "../controller/product-controller"

export class ProductRouter extends BaseRouter<ProductController> {
    constructor() {
        super(new ProductController())

        this.addRoute("/api/product/getAll", this.controller.getAll)
        this.addRoute("/api/product/getById", this.controller.getById)
        this.addRoute("/api/product/getByName", this.controller.getByName)
        this.addRoute("/api/product/create", this.controller.create)
        this.addRoute("/api/product/update", this.controller.update)
        this.addRoute("/api/product/delete", this.controller.delete)
    }
}