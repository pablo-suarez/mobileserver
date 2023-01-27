import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePromoInput, UpdatePromoInput } from './dto/inputs';
import { Repository } from 'typeorm';
import { Promo } from './entities/promo.entity';


@Injectable()
export class PromosService {

  constructor(
    @InjectRepository(Promo)
    private readonly promoRepository:Repository<Promo>
  ){}

  async create(createPromoInput: CreatePromoInput): Promise<Promo> {
    const newPromo = this.promoRepository.create(createPromoInput);
    return await this.promoRepository.save(newPromo);
  }

  async findAll():Promise<Promo[]> {
    return await this.promoRepository.find();
  }

  async findOne(id: string) {
    const promo =  await this.promoRepository.findOneBy({id});
    if(!promo) throw new NotFoundException(`Promo with id: ${ id } not found`);
    return promo;
  }

  async update(id: string, updatePromoInput: UpdatePromoInput) {

    const promo = await this.promoRepository.preload({
      id,
      ...updatePromoInput
    })
    if( !promo ) throw new NotFoundException(`Promo with id: ${ id } not found`)
    return this.promoRepository.save(promo);
  }

  async remove(id: string) {
    const promo = await this.findOne(id);
    await this.promoRepository.remove(promo);
    return {...promo,id};
  }
}
