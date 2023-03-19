import {v4 as uuidv4 } from "uuid"

import { NotFoundError } from "../../error/not-found-error";
import { PhotoStorage } from "../../minio/storage/photo-storage";
import { ProductRepository } from "../../postgres/repositories/product-repository";
import { ProductMapper } from "../mapper/product-mapper";
import { ProductDomain } from "../model/product";

interface GetByIdParams {
    id: string
}

interface GetByNameParams {
    name: string
}

interface CreateParams {
    name: string
    description: string
    price: number
    photoPath: string
}

interface UpdateParams {
    id: string
    name: string
    description: string
    price: number
    photoPath: string
}

interface DeleteParams {
    id: string
}

export class ProductResolver {
    repository: ProductRepository
    photoStorage: PhotoStorage
    mapper: ProductMapper

    constructor() {
        this.repository = new ProductRepository()
        this.photoStorage = new PhotoStorage()
        this.mapper = new ProductMapper()
    }

    async getAll(): Promise<ProductDomain[]> {
        const products = await this.repository.getAll()

        return this.mapper.entity2domainBatch(products)
    }

    async getById(params: GetByIdParams): Promise<ProductDomain> {
        const product = await this.repository.getById(params)
        if (!product)
            throw new NotFoundError("Product")

        return this.mapper.entity2domain(product)
    }

    async getByName(params: GetByNameParams): Promise<ProductDomain> {
        const product = await this.repository.getByName(params)
        if (!product)
            throw new NotFoundError("Product")
        
        return this.mapper.entity2domain(product)
    }

    async create(params: CreateParams): Promise<ProductDomain> {
        const id: string = uuidv4()

        const photoName = params.photoPath.split("/").at(-1)
        if (!photoName)
            throw new NotFoundError("Photo")

        const photoURL = await this.photoStorage.insertPhoto(id, photoName, params.photoPath)

        const product = await this.repository.create({
            id: id,
            name: params.name,
            description: params.description,
            price: params.price,
            photoURL: photoURL
        })
        
        return this.mapper.entity2domain(product)
    }

    async update(params: UpdateParams) {
        await this.getById({ id: params.id })

        const photoName = params.photoPath.split("/").at(-1)
        if (!photoName)
            throw new NotFoundError("Photo")

        const photoURL = await this.photoStorage.updatePhoto(params.id, photoName, params.photoPath)

        const product = await this.repository.update({
            id: params.id,
            name: params.name,
            description: params.description,
            price: params.price,
            photoURL: photoURL
        })

        return product
    }

    async delete(params: DeleteParams) {
        await this.getById({ id: params.id })
        await this.photoStorage.deleteProductDirectory(params.id)
        await this.repository.delete(params)

        return `Product with id ${params.id} was deleted`
    }
}