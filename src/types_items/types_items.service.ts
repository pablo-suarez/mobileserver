import { Injectable, NotFoundException } from '@nestjs/common';
import { TypesItem } from './entities/types_item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTypesItemInput,UpdateTypesItemInput } from './dto/inputs';


@Injectable()
export class TypesItemsService {

  constructor(
    @InjectRepository(TypesItem)
    private readonly typesItemRepository:Repository<TypesItem>
    ){}

  async create(createTypesItemInput: CreateTypesItemInput):Promise<TypesItem> {
    const newTypeItem = this.typesItemRepository.create(createTypesItemInput);
    return await this.typesItemRepository.save(newTypeItem);
  }

  async findAll(): Promise<TypesItem[]> {
    return await this.typesItemRepository.find();
  }

  async findOne(id: number):Promise<TypesItem> {
    const typeItem = await this.typesItemRepository.findOneBy({id});
    if( !typeItem ) throw new NotFoundException(`Type of item with id ${id} not found`);
    return typeItem;
  }

  async update(id: number, updateTypesItemInput: UpdateTypesItemInput):Promise <TypesItem> {
    const typeItem = await this.typesItemRepository.preload({
      ...updateTypesItemInput,
      id
    });
    if( !typeItem ) throw new NotFoundException(`Type of item with id ${id} not found`);
    return typeItem;
  }

  async remove(id: number):Promise <TypesItem> {
    const typeItem = await this.findOne(id);
    await this.typesItemRepository.remove(typeItem);
    return {...typeItem,id};
  }
}
