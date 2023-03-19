import http from "http"
import { HTTPError } from "../error/http-error"
import { object2JSON, JSON2Object } from "./json"

export async function getBody(req: http.IncomingMessage): Promise<string> {
    let arrayBody: string[] = []

    for await (const chunk of req) {
        arrayBody.push(chunk.toString())
    }
    return arrayBody.join("")
}

export function sendErrorResponse(res: http.ServerResponse, error: HTTPError | Error) {
    let statusCode = 500
    if (error instanceof HTTPError)
        statusCode = error.statusCode
        
    res.writeHead(statusCode,
        {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    )
    res.end(object2JSON({ error: error.message }))
}

export function sendResponse<T>(res: http.ServerResponse, object: T) {
    let responseBody: string
    if (typeof(object) === "string") {
        responseBody = object2JSON({message: object})
    } else {
        responseBody = object2JSON(object)
    }

    res.writeHead(200,
        {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    )
    res.end(responseBody)
}

export async function handleNoInput<K>(req: http.IncomingMessage, res: http.ServerResponse, resolver: () => K) {
    const output = await resolver()
    return sendResponse(res, output)
}

export async function handle<T, K>(req: http.IncomingMessage, res: http.ServerResponse, resolver: (input: T) => K) {
    const requestBody = await getBody(req)
    const input = JSON2Object<T>(requestBody)
    const output = await resolver(input)
    return sendResponse(res, output)
}