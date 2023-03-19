import * as Minio from "minio"

export function getMinIOConnection(): Minio.Client {
    return new Minio.Client({
        endPoint: "localhost",
        port: 9000,
        useSSL: false,
        accessKey: "minio-dev-user",
        secretKey: "minio-dev-password",
    })
}