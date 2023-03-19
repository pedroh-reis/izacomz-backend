import http from "http"

import { handle, handleNoInput } from "../utils/http"
import { ProductResolver } from "../domain/resolver/product-resolver"

export class ProductController {
    resolver: ProductResolver

    constructor() {
        this.resolver = new ProductResolver()
    }
    async getAll(req: http.IncomingMessage, res: http.ServerResponse) {
        await handleNoInput(req, res, this.resolver.getAll.bind(this.resolver))
    }

    async getById(req: http.IncomingMessage, res: http.ServerResponse) {
        await handle(req, res, this.resolver.getById.bind(this.resolver))
    }

    async getByName(req: http.IncomingMessage, res: http.ServerResponse) {
        await handle(req, res, this.resolver.getByName.bind(this.resolver))
    }

    async create(req: http.IncomingMessage, res: http.ServerResponse) {
        await handle(req, res, this.resolver.create.bind(this.resolver))
    }

    async update(req: http.IncomingMessage, res: http.ServerResponse) {
        await handle(req, res, this.resolver.update.bind(this.resolver))
    }

    async delete(req: http.IncomingMessage, res: http.ServerResponse) {
        await handle(req, res, this.resolver.delete.bind(this.resolver))
    }
}