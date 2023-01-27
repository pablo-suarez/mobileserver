import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/inputs';

describe('CategoriesResolver', () => {
  let resolver: CategoriesResolver;
  let categoryMockService : CategoriesService;
  let test_id = 1;
  let title_changed = 'Title changed';

  let createDto = new CreateCategoryInput();
  (createDto.title='TitleTest'),(createDto.description='Test description');

  const categoriesService = {
    create: jest.fn((category)=>{
      return {
        id: test_id ,
        ...category
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
    update: jest.fn((id,category)=>{
      let obj = {};
      Object.keys(createDto)
      .forEach(k => obj[k] = (category[k] ?? createDto[k]));
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
      providers: [CategoriesResolver,
      {
        provide: CategoriesService,
        useValue: categoriesService
      }],
    }).compile();

    resolver = module.get<CategoriesResolver>(CategoriesResolver);
    categoryMockService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should have create function', () => {
    expect(resolver.createCategory).toBeDefined();
  })
  
  it('should have findAll function', () => {
    expect(resolver.findAll).toBeDefined();
  })

  it('should have findOne function', () => {
    expect(resolver.findOne).toBeDefined();
  })

  it('should have update function', () => {
    expect(resolver.updateCategory).toBeDefined();
  })

  it('should have remove function', () => {
    expect(resolver.removeCategory).toBeDefined();
  })

  it('should create a category and return category with id', async () => {
    const data = await resolver.createCategory(createDto);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(categoryMockService.create).toBeCalled();
  });

  it('should find array of categories (Allcategories)', async () => {
    const data = await resolver.findAll();
    expect(categoryMockService.findAll).toBeCalled();
    expect(Array.isArray(data)).toBe(true);
  });

  it('should find one category', async () => {
    const data = await resolver.findOne(test_id);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(categoryMockService.findOne).toBeCalled();
  });

  it('should update category', async () => {
    const data = await resolver.updateCategory({id:test_id,title:title_changed});
    expect(data).toEqual({
      ...createDto,
      id:test_id,
      title:title_changed
    });
    expect(categoryMockService.update).toBeCalled();
  });

  it('should remove category', async () => {
    const data = await resolver.removeCategory(test_id);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(categoryMockService.remove).toBeCalled();
  });
});
