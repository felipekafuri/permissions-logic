import { Request, Response } from 'express';
import PermissionsRepository from '../repositories/PermissionsRepository';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../repositories/ProductRepository';

class ProductController {
  async create(request: Request, response: Response) {

    const productRepository = getCustomRepository(ProductsRepository);

    const { name, description } = request.body;

    const existProduct = await productRepository.findOne({ name });

    if (existProduct) {
      return response.status(400).json({ err: "Product already exists" });
    }

    const product = productRepository.create({
      name,
      description,
    });

    await productRepository.save(product);

    return response.json(product)
  }

  async index(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductsRepository);


    const products = await productRepository.find();

    return response.json(products)
  }

  async show(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductsRepository);

    const { id } = request.params


    const product = await productRepository.findOne(id);

    return response.json(product)
  }

}

export default ProductController;