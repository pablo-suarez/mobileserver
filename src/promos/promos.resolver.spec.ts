import { Test, TestingModule } from '@nestjs/testing';
import { CreatePromoInput } from './dto/inputs';
import { PromosResolver } from './promos.resolver';
import { PromosService } from './promos.service';

describe('PromosResolver', () => {
  let resolver: PromosResolver;
  let promoMockService : PromosService;
  let test_id = "123e4567-e89b-12d3-a456-426614174000";
  let title_changed = 'Promo changed';

  let createDto = new CreatePromoInput();
  (createDto.title='PromoTitle'),(createDto.description='Promo description');

  const promosService = {
    create: jest.fn((promo)=>{
      return {
        id: test_id ,
        ...promo
      }
    }),
    findAll: jest.fn(()=>{
      return []
    }),
    findOne: jest.fn((id)=>{
      return{
        id ,
        ...createDto
      }
    }),
    update: jest.fn((id,promo)=>{
      let obj = {};
      Object.keys(createDto)
      .forEach(k => obj[k] = (promo[k] ?? createDto[k]));
      return {id,...obj};
    }),
    remove: jest.fn((id)=>{
      return {
        id ,
        ...createDto
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromosResolver,
      {
        provide: PromosService,
        useValue: promosService
      }],
    }).compile();

    resolver = module.get<PromosResolver>(PromosResolver);
    promoMockService = module.get<PromosService>(PromosService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should have create function', () => {
    expect(resolver.createPromo).toBeDefined();
  })
  
  it('should have findAll function', () => {
    expect(resolver.findAll).toBeDefined();
  })

  it('should have findOne function', () => {
    expect(resolver.findOne).toBeDefined();
  })

  it('should have update function', () => {
    expect(resolver.updatePromo).toBeDefined();
  })

  it('should have remove function', () => {
    expect(resolver.removePromo).toBeDefined();
  })

  it('should create a promo and return promo with id', async () => {
    const data = await resolver.createPromo(createDto);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(promoMockService.create).toBeCalled();
  });

  it('should find array of promos (Allpromos)', async () => {
    const data = await resolver.findAll();
    expect(promoMockService.findAll).toBeCalled();
    expect(Array.isArray(data)).toBe(true);
  });

  it('should find one promo', async () => {
    const data = await resolver.findOne(test_id);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(promoMockService.findOne).toBeCalled();
  });

  it('should update promo', async () => {
    const data = await resolver.updatePromo({id:test_id,title:title_changed});
    expect(data).toEqual({
      ...createDto,
      id:test_id,
      title:title_changed
    });
    expect(promoMockService.update).toBeCalled();
  });

  it('should remove promo', async () => {
    const data = await resolver.removePromo(test_id);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(promoMockService.remove).toBeCalled();
  });
});
