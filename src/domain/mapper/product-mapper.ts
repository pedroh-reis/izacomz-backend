import { ProductEntity } from "../../postgres/model/product";
import { ProductDomain } from "../model/product";

export class ProductMapper {
    entity2domain(entity: ProductEntity): ProductDomain {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            price: Number(entity.price),
            photoURL: entity.photo_url
        }
    }

    entity2domainBatch(entities: ProductEntity[]): ProductDomain[] {
        return entities.map((entity) => this.entity2domain(entity))
    }
}