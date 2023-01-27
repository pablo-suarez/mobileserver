import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromosService } from './promos.service';
import { Promo } from './entities/promo.entity';
import { CreatePromoInput, UpdatePromoInput } from './dto/inputs';

@Resolver(() => Promo)
export class PromosResolver {
  constructor(private readonly promosService: PromosService) {}

  @Mutation(() => Promo)
  createPromo(@Args('createPromoInput') createPromoInput: CreatePromoInput): Promise<Promo> {
    return this.promosService.create(createPromoInput);
  }

  @Query(() => [Promo], { name: 'promos' })
  findAll(): Promise<Promo[]> {
    return this.promosService.findAll();
  }

  @Query(() => Promo, { name: 'promo' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.promosService.findOne(id);
  }

  @Mutation(() => Promo)
  updatePromo(@Args('updatePromoInput') updatePromoInput: UpdatePromoInput) {
    return this.promosService.update(updatePromoInput.id, updatePromoInput);
  }

  @Mutation(() => Promo)
  removePromo(@Args('id', { type: () => String }) id: string) {
    return this.promosService.remove(id);
  }
}
