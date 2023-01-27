import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TypesItemsService } from './types_items.service';
import { TypesItem } from './entities/types_item.entity';
import { CreateTypesItemInput,UpdateTypesItemInput } from './dto/inputs';

@Resolver(() => TypesItem)
export class TypesItemsResolver {
  constructor(private readonly typesItemsService: TypesItemsService) {}

  @Mutation(() => TypesItem)
  createTypesItem(@Args('createTypesItemInput') createTypesItemInput: CreateTypesItemInput):Promise <TypesItem> {
    return this.typesItemsService.create(createTypesItemInput);
  }

  @Query(() => [TypesItem], { name: 'typesItems' })
  findAll():Promise <TypesItem[]> {
    return this.typesItemsService.findAll();
  }

  @Query(() => TypesItem, { name: 'typesItem' })
  findOne(@Args('id', { type: () => Int }) id: number):Promise <TypesItem> {
    return this.typesItemsService.findOne(id);
  }

  @Mutation(() => TypesItem)
  updateTypesItem(@Args('updateTypesItemInput') updateTypesItemInput: UpdateTypesItemInput):Promise <TypesItem> {
    return this.typesItemsService.update(updateTypesItemInput.id, updateTypesItemInput);
  }

  @Mutation(() => TypesItem)
  removeTypesItem(@Args('id', { type: () => Int }) id: number):Promise <TypesItem> {
    return this.typesItemsService.remove(id);
  }
}
