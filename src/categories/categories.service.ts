import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/inputs';
import { UpdateCategoryInput } from './dto/inputs';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository:Repository<Category>){}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const newCategory = this.categoriesRepository.create(createCategoryInput);
    return await this.categoriesRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOneBy({id});
    if(!category) throw new NotFoundException(`Category with id ${ id } not found`);
    return category;
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.categoriesRepository.preload({
      ...updateCategoryInput,
      id
    });
    if(!category) throw new NotFoundException(`Category with id ${ id } not found`);
    return this.categoriesRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await this.categoriesRepository.remove(category);
    return {...category,id};
  }
}
