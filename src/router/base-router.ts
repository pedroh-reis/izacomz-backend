import http from "http"

export class BaseRouter<T> {
    controller: T;
    routes: Map<string, (req: http.IncomingMessage, res: http.ServerResponse) => void>

    constructor(controller: T) {
        this.controller = controller
        this.routes = new Map()
    }
    
    addRoute(url: string, handlerFunction: (req: http.IncomingMessage, res: http.ServerResponse) => void): void {
        this.routes.set(url, handlerFunction.bind(this.controller))
    }
}