import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { BrandsService } from '../brands/brands.service';
import { CategoriesService } from '../categories/categories.service';
import { TypesItemsService } from '../types_items/types_items.service';

@Injectable()
export class ProductsService {

  constructor(
  @InjectRepository(Product)
  private readonly productsRepository:Repository<Product>,
  private readonly brandsService:BrandsService,
  private readonly categoriesService:CategoriesService,
  private readonly typesItemsService:TypesItemsService
  ){}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    console.log(createProductInput);
    const newProduct = await this.productsRepository.create(createProductInput);
    return await this.productsRepository.save(newProduct);
  }

  findAll():Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: string):Promise<Product> {
    const product = this.productsRepository.findOneBy({id});
    if(!product) throw new NotFoundException(`Product with id: ${ id } not found`);
    return product;
  }

  async update(id: string, updateProductInput: UpdateProductInput):Promise<Product> {
    const product = await this.productsRepository.preload({
      ...updateProductInput,
      id
    });
    if(!product) throw new NotFoundException(`Product with id: ${ id } not found`);
    return this.productsRepository.save(product);
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }

  async getBrand(id:number){
    return await this.brandsService.findOne(id);
  }

  async getCategory(id:number){
    return await this.categoriesService.findOne(id);
  }

  async gettypesItem(id:number){
    return await this.typesItemsService.findOne(id);
  }
}
