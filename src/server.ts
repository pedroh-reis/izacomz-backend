import http from "http"

import { Router } from "./router/router"
import { NotFoundError } from "./error/not-found-error"
import { sendErrorResponse } from "./utils/http"
import { object2JSON } from "./utils/json"

export class Server {
    private port: number
    private router: Router
    private server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

    constructor() {
        this.port = 3000
        this.router = new Router()
        this.server = http.createServer(this.requestListener.bind(this))

        this.server.listen(this.port, this.backlog.bind(this))
    }

    private async requestListener(req: http.IncomingMessage, res: http.ServerResponse) {
        const handlerFunction = this.router.getHandlerFunction(req)

        if (!handlerFunction)
            return sendErrorResponse(res, new NotFoundError("Route"))

        try {
            return await handlerFunction(req, res)
        } catch (error) {
            console.log(error)
            if (error instanceof Error)
                return sendErrorResponse(res, error)

            return res.end(object2JSON({ error: "error" }))
        }
    }

    private backlog() {
        console.log(`Server is running on port ${this.port}`)
    }    
}
