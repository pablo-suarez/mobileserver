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
    return this.brandsRepository.find();
  }

  async findOne(id: string) {
    const brand = await this.brandsRepository.findOneBy({ id });
    if( !brand ) throw new NotFoundException(`Brand with id: ${ id } not found`);
    return brand;
  }

  async update(id: string, updateBrandInput: UpdateBrandInput) {

    const getbrand = await this.findOne(id);
    if ( !getbrand ) throw new NotFoundException(`Brand with id: ${ id } not found`);
      const brand = await this.brandsRepository.preload({
        ...updateBrandInput,
        id:getbrand.id
          }
        );
    return this.brandsRepository.save(brand);
  }

  async remove(id: string): Promise<Brand> {
    const brand = await this.findOne(id);
    await this.brandsRepository.remove(brand);
    console.log(brand);
    return { ...brand, id};
  }
}
