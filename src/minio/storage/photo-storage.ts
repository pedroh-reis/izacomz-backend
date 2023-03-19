import Minio from "minio"

import { object2JSON } from "../../utils/json"
import { getMinIOConnection } from "../minio-connection"

export class PhotoStorage {
    db: Minio.Client

    constructor() {
        this.db = getMinIOConnection()
    }

    private async setPolicy(productId: string): Promise<void> {
        const policy = {
            Version: "2012-10-17",
            Statement: [
                {
                    Effect: "Allow",
                    Principal: {
                        AWS: ["*"]
                    },
                    Action: ["s3:GetObject"],
                    Resource: [`arn:aws:s3:::${productId}/*`]
                }
            ]
        }

        await this.db.setBucketPolicy(productId, object2JSON(policy))
    }

    private async createProductDirectory(productId: string): Promise<void> {
        await this.db.makeBucket(productId)
        await this.setPolicy(productId)
    }

    private async productDirectoryExists(productId: string): Promise<boolean> {
        return await this.db.bucketExists(productId)
    }

    private async emptyProductDirectory(productId: string): Promise<void> {
        const photoNames: string[] = await this.getPhotosName(productId)
        await this.db.removeObjects(productId, photoNames)
    }

    async deleteProductDirectory(productId: string): Promise<void> {
        await this.emptyProductDirectory(productId)
        await this.db.removeBucket(productId)
    }

    

    






    getPhotoURL(productId: string, photoName: string): string {
        return `http://localhost:9000/${productId}/${photoName}`
    }

    private async getPhotosName(productId: string): Promise<string[]> {
        let photoNames: string[] = []
        const photoStream = this.db.listObjects(productId)

        for await (const photo of photoStream) {
            photoNames.push(photo.name)
        }

        return photoNames
    }

    async insertPhoto(productId: string, photoName: string, photoPath: string): Promise<string> {
        if (!await this.productDirectoryExists(productId)) {
            await this.createProductDirectory(productId)
        }
        await this.db.fPutObject(productId, photoName, photoPath)

        return this.getPhotoURL(productId, photoName)
    }

    async updatePhoto(productId: string, photoName: string, photoPath: string): Promise<string> {
        await this.emptyProductDirectory(productId)

        return await this.insertPhoto(productId, photoName, photoPath)
    }
}