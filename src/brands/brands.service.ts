import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandInput,UpdateBrandInput } from './dto/inputs';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {

  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository:Repository<Brand>
    ){}

  async create(createBrandInput: CreateBrandInput): Promise<Brand> {
    const newBrand = this.brandsRepository.create(createBrandInput);
    return await this.brandsRepository.save(newBrand);
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandsRepository.find();
  }

  async findOne(id: number) {
    const brand = await this.brandsRepository.findOneBy({ id });
    if( !brand ) throw new NotFoundException(`Brand with id: ${ id } not found`);
    return brand;
  }

  async update(id: number, updateBrandInput: UpdateBrandInput) {

    const brand = await this.brandsRepository.preload({
      ...updateBrandInput,
      id
        }
      );
    if ( !brand ) throw new NotFoundException(`Brand with id: ${ id } not found`);
    return this.brandsRepository.save(brand);
  }

  async remove(id: number): Promise<Brand> {
    const brand = await this.findOne(id);
    await this.brandsRepository.remove(brand);
    console.log(brand);
    return { ...brand, id};
  }
}
