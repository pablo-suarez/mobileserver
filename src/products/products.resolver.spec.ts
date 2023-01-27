import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductInput } from './dto/create-product.input';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;
  let productMockService : ProductsService;
  let test_id = "123e4567-e89b-12d3-a456-426614174000";
  let title_changed = 'Title changed';

  let createDto = new CreateProductInput();
  (createDto.name='TitleTest'),(createDto.description='Test description');

  const productsService = {
    create: jest.fn((product)=>{
      return {
        id: test_id ,
        ...product
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
    update: jest.fn((id,product)=>{
      let obj = {};
      Object.keys(createDto)
      .forEach(k => obj[k] = (product[k] ?? createDto[k]));
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
      providers: [ProductsResolver,
      {
        provide: ProductsService,
        useValue: productsService
      }],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
    productMockService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should have create function', () => {
    expect(resolver.createProduct).toBeDefined();
  })
  
  it('should have findAll function', () => {
    expect(resolver.findAll).toBeDefined();
  })

  it('should have findOne function', () => {
    expect(resolver.findOne).toBeDefined();
  })

  it('should have update function', () => {
    expect(resolver.updateProduct).toBeDefined();
  })

  it('should have remove function', () => {
    expect(resolver.removeProduct).toBeDefined();
  })

  it('should create a product and return product with id', async () => {
    const data = await resolver.createProduct(createDto);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(productMockService.create).toBeCalled();
  });

  it('should find array of products (Allproducts)', async () => {
    const data = await resolver.findAll();
    expect(productMockService.findAll).toBeCalled();
    expect(Array.isArray(data)).toBe(true);
  });

  it('should find one product', async () => {
    const data = await resolver.findOne(test_id);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(productMockService.findOne).toBeCalled();
  });

  it('should update product', async () => {
    const data = await resolver.updateProduct({id:test_id,name:title_changed});
    expect(data).toEqual({
      ...createDto,
      id:test_id,
      name:title_changed
    });
    expect(productMockService.update).toBeCalled();
  });

  it('should remove product', async () => {
    const data = await resolver.removeProduct(test_id);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(productMockService.remove).toBeCalled();
  });
});
