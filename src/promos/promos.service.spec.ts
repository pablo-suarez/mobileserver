import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePromoInput } from './dto/inputs';
import { Promo } from './entities/promo.entity';
import { PromosService } from './promos.service';

describe('PromosService', () => {
  let service: PromosService;
  const test_id = "123e4567-e89b-12d3-a456-426614174000";
  const title_changed = 'Promo changed';

  let createDto = new CreatePromoInput();
  (createDto.title='PromoTest'),(createDto.description='Promo description');

  let promosRepository = {
    create: jest.fn().mockImplementation((payload)=>payload),
    save: jest.fn().mockImplementation((promo)=>
      Promise.resolve({
        id: test_id,
        ...promo
      })
    ),
    find: jest.fn().mockImplementation(()=>
    Promise.resolve([])
    ),
    findOneBy: jest.fn().mockImplementation(({id})=>
    Promise.resolve({
      id,
      ...createDto
    })
    ),
    preload: jest.fn((promo)=>{
      console.log('Promo PRELOAD ES: '+JSON.stringify(promo));
      let obj = {};
      Object.keys(createDto)
      .forEach(k => obj[k] = (promo[k] ?? createDto[k]));
      return {id:test_id,...obj};
    }),
    remove: jest.fn((id)=>{
      return {
        id ,
        ...createDto
      }
    })
  };


  const PROMO_REPOSITORY_TOKEN = getRepositoryToken(Promo); 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromosService,
      {
        provide: PROMO_REPOSITORY_TOKEN,
        useValue : promosRepository
      }],
    }).compile();

    service = module.get<PromosService>(PromosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have create function', () => {
    expect(service.create).toBeDefined();
  })
  
  it('should have findAll function', () => {
    expect(service.findAll).toBeDefined();
  })

  it('should have findOne function', () => {
    expect(service.findOne).toBeDefined();
  })

  it('should have update function', () => {
    expect(service.update).toBeDefined();
  })

  it('should have remove function', () => {
    expect(service.remove).toBeDefined();
  })

  it('should create a promo and return promo with id', async () => {
    expect(await service.create(createDto)).toEqual({
      id:test_id,
      ...createDto
    });
  });

  it('should get an array with a list of promos', async () => {
    const data = await service.findAll();
    expect(data).toEqual([]);
    expect(Array.isArray(data)).toBe(true);
  });

  it('should find a promo with an id', async () => {
    expect(await service.findOne(test_id)).toEqual({
      id:test_id,
      ...createDto
    });
  });

  it('should update a promo and return the promo', async () => {
    expect(await service.update(test_id,{id:test_id,title:title_changed})).toEqual({
      ...createDto,
      id:test_id,
      title:title_changed
    });
  });

  it('should remove a promo and return promo with id', async () => {
    expect(await service.remove(test_id)).toEqual({
      id: "123e4567-e89b-12d3-a456-426614174000",
      ...createDto
    });
  });
});
