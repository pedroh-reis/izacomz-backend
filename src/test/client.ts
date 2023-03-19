export class TestClient {
    host: string
    port: number
    url: string
    constructor() {
        this.host = "localhost"
        this.port = 3000
        this.url = `http://${this.host}:${this.port}`
    }

    async request<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.url}${endpoint}`)

        if (response.status != 200) {
            throw new Error((await response.json()).error)
        }

        const data: T = await response.json()
        return data
    }
}