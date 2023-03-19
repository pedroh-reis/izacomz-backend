import { BaseRouter } from "./base-router"
import { HelloController } from "../controller/hello-controller"

export class HelloRouter extends BaseRouter<HelloController> {
    constructor() {
        super(new HelloController())
        
        this.addRoute("/api/hello", this.controller.hello)
    }
}