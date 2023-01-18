import { Test, TestingModule } from '@nestjs/testing';
import { BrandsResolver } from './brands.resolver';
import { BrandsService } from './brands.service';
import { CreateBrandInput } from './dto/inputs';
import { Brand } from './entities/brand.entity';

describe('BrandsResolver', () => {
  let resolver: BrandsResolver;
  let brandMockService : BrandsService;
  let test_id = 'test-id';
  let title_changed = 'Title changed';

  let createDto = new CreateBrandInput();
  (createDto.title='TitleTest'),(createDto.description='Test description');

  const brandsService = {
    create: jest.fn((brand)=>{
      return {
        id: test_id ,
        ...brand
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
    update: jest.fn((id,brand)=>{
      let obj = {};
      Object.keys(createDto)
      .forEach(k => obj[k] = (brand[k] ?? createDto[k]));
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
      providers: [BrandsResolver,
      {
        provide: BrandsService,
        useValue: brandsService
      }],
    }).compile();

    resolver = module.get<BrandsResolver>(BrandsResolver);
    brandMockService = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should have create function', () => {
    expect(resolver.createBrand).toBeDefined();
  })
  
  it('should have findAll function', () => {
    expect(resolver.findAll).toBeDefined();
  })

  it('should have findOne function', () => {
    expect(resolver.findOne).toBeDefined();
  })

  it('should have update function', () => {
    expect(resolver.updateBrand).toBeDefined();
  })

  it('should have remove function', () => {
    expect(resolver.removeBrand).toBeDefined();
  })

  it('should create a brand and return brand with id', async () => {
    const data = await resolver.createBrand(createDto);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(brandMockService.create).toBeCalled();
  });

  it('should find array of brands (Allbrands)', async () => {
    const data = await resolver.findAll();
    expect(brandMockService.findAll).toBeCalled();
    expect(Array.isArray(data)).toBe(true);
  });

  it('should find one brand', async () => {
    const data = await resolver.findOne(test_id);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(brandMockService.findOne).toBeCalled();
  });

  it('should update brand', async () => {
    const data = await resolver.updateBrand({id:test_id,title:title_changed});
    expect(data).toEqual({
      ...createDto,
      id:test_id,
      title:title_changed
    });
    expect(brandMockService.update).toBeCalled();
  });

  it('should remove brand', async () => {
    const data = await resolver.removeBrand(test_id);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(brandMockService.remove).toBeCalled();
  });

});
