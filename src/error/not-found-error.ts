import { HTTPError } from "./http-error";

export class NotFoundError extends HTTPError {
    constructor(resource: string) {
        super(`${resource} not found`, 404)
    }
}