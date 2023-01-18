import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from './brands.service';
import { CreateBrandInput } from './dto/inputs';
import { Brand } from './entities/brand.entity';

describe('BrandsService', () => {
  let service: BrandsService;
  const test_id = 'test-id';
  const title_changed = 'Title changed';

  let createDto = new CreateBrandInput();
  (createDto.title='MovilTest'),(createDto.description='Movil description');

  let brandsRepository = {
    create: jest.fn().mockImplementation((payload)=>payload),
    save: jest.fn().mockImplementation((brand)=>
      Promise.resolve({
        id: test_id,
        ...brand
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
    preload: jest.fn((brand)=>{
      console.log('BRAND PRELOAD ES: '+JSON.stringify(brand));
      let obj = {};
      Object.keys(createDto)
      .forEach(k => obj[k] = (brand[k] ?? createDto[k]));
      return {id:test_id,...obj};
    }),
    remove: jest.fn((id)=>{
      return {
        id ,
        ...createDto
      }
    })
  };


  const BRAND_REPOSITORY_TOKEN = getRepositoryToken(Brand); 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandsService,
      {
        provide: BRAND_REPOSITORY_TOKEN,
        useValue : brandsRepository
      }],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
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

  it('should create a brand and return brand with id', async () => {
    expect(await service.create(createDto)).toEqual({
      id:test_id,
      ...createDto
    });
  });

  it('should get an array with a list of brands', async () => {
    const data = await service.findAll();
    expect(data).toEqual([]);
    expect(Array.isArray(data)).toBe(true);
  });

  it('should find a brand with an id', async () => {
    expect(await service.findOne(test_id)).toEqual({
      id:test_id,
      ...createDto
    });
  });

  it('should update a brand and return the brand', async () => {
    expect(await service.update(test_id,{id:test_id,title:title_changed})).toEqual({
      ...createDto,
      id:test_id,
      title:title_changed
    });
  });

  it('should remove a brand and return brand with id', async () => {
    expect(await service.remove(test_id)).toEqual({
      id:'test-id',
      ...createDto
    });
  });

});