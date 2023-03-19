import { Client } from "pg";
import { ProductEntity } from "../model/product";
import { getPostgresConnection } from "../postgres-connection";

interface GetByIdParams {
    id: string
}

interface GetByNameParams {
    name: string
}

interface CreateParams {
    id: string
    name: string
    description: string
    price: number
    photoURL: string
}

interface UpdateParams {
    id: string
    name: string
    description: string
    price: number
    photoURL: string
}

interface DeleteParams {
    id: string
}

export class ProductRepository {
    private db: Client;

    constructor() {
        this.db = getPostgresConnection()
    }

    async getAll(): Promise<ProductEntity[]> {
        const query = `
        SELECT *
        FROM product
        `
        const result = await this.db.query(query)
        const products = result.rows
        return products
    }

    async getById(params: GetByIdParams): Promise<ProductEntity> {
        const query = `
        SELECT *
        FROM product
        WHERE product.id = $1
        `
        const values = [params.id]

        const result = await this.db.query<ProductEntity>(query, values)
        const product = result.rows[0]

        return product
    }

    async getByName(params: GetByNameParams): Promise<ProductEntity> {
        const query = `
        SELECT *
        FROM product
        WHERE product.name = $1
        `
        const values = [params.name]

        const result = await this.db.query<ProductEntity>(query, values)
        const product = result.rows[0]
        
        return product
    }

    async create(params: CreateParams): Promise<ProductEntity> {
        const query = `
        INSERT INTO product (id, name, description, price, photo_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `
        const values  = [params.id, params.name, params.description, params.price, params.photoURL]

        const result = await this.db.query<ProductEntity>(query, values)
        const product = result.rows[0]

        return product
    }

    async update(params: UpdateParams): Promise<ProductEntity> {
        const query = `
        UPDATE product
        SET
            name = $1,
            description = $2,
            price = $3,
            photo_url = $4
        WHERE id = $5
        RETURNING *;
        `
        const values = [params.name, params.description, params.price, params.photoURL, params.id]

        const result = await this.db.query<ProductEntity>(query, values)
        const product = result.rows[0]

        return product
    }

    async delete(params: DeleteParams): Promise<void> {
        const query = `
        DELETE FROM product
        WHERE id = $1;
        `
        const values = [params.id]
        await this.db.query(query, values)
    }
}