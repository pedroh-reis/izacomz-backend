import { BucketItem } from "minio";
import { getMinIOConnection } from "./minio/minio-connection";
import { JSON2Object } from "./utils/json";

async function teste() {
    const client = getMinIOConnection()

    let photos: BucketItem[] = []

    const stream = client.listObjects("teste", "", true)

    for await (const photo of stream) {
        photos.push(photo)
    }
    // stream.on("data", function(photo) { photos.push(photo) })
    // stream.on("end", async function() { console.log(photos) })

    console.log(photos)
}

teste()