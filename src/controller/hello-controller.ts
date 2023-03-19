import http from "http"
import { HelloResolver } from "../domain/resolver/hello-resolver"
import { handle } from "../utils/http"

export class HelloController {
    resolver: HelloResolver

    constructor() {
        this.resolver = new HelloResolver()
    }

    async hello(req: http.IncomingMessage, res: http.ServerResponse) {
        await handle(req, res, this.resolver.hello.bind(this.resolver))
    }
}