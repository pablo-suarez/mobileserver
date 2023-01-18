import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { BrandsService } from './brands.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput,UpdateBrandInput } from './dto/inputs';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(private readonly brandsService: BrandsService) {}

  @Mutation(() => Brand)
  async createBrand(@Args('createBrandInput') createBrandInput: CreateBrandInput): Promise<Brand> {
    return this.brandsService.create(createBrandInput);
  }

  @Query(() => [Brand], { name: 'brands' })
  async findAll():Promise<Brand[]> {
    return this.brandsService.findAll();
  }

  @Query(() => Brand, { name: 'brand' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Brand> {
    return this.brandsService.findOne(id);
  }

  @Mutation(() => Brand)
  updateBrand(@Args('updateBrandInput') updateBrandInput: UpdateBrandInput) {
    return this.brandsService.update(updateBrandInput.id, updateBrandInput);
  }

  @Mutation(() => Brand)
  removeBrand(@Args('id', { type: () => ID }) id: string): Promise<Brand> {
    return this.brandsService.remove(id);
  }
}
