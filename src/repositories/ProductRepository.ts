import Product from "../entities/Product";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {

}

export default ProductsRepository;