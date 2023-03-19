import http from "http"
import { HelloRouter } from "./hello-router";
import { ProductRouter } from "./product-router";

export class Router {
    routes: Map<string, (req: http.IncomingMessage, res: http.ServerResponse) => void>

    constructor() {
        const routers = [
            new HelloRouter(),
            new ProductRouter()
        ]

        this.routes = new Map<string, (req: http.IncomingMessage, res: http.ServerResponse) => void>()
        for (let router of routers) {
            for (let [url, handlerFunction] of router.routes) {
                if (this.routes.get(url)) {
                    throw Error(`URL ${url} is duplicated.`)
                }
                this.routes.set(url, handlerFunction)
            }
        }
    }

    getHandlerFunction(req: http.IncomingMessage) {
        if (!req.url)
            return undefined
        return this.routes.get(req.url)
    }
}