import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/inputs';
import { Category } from './entities/category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const test_id = 1;
  const title_changed = 'Category changed';

  let createDto = new CreateCategoryInput();
  (createDto.title='CategoryTest'),(createDto.description='Category description');

  let categoriesRepository = {
    create: jest.fn().mockImplementation((payload)=>payload),
    save: jest.fn().mockImplementation((category)=>
      Promise.resolve({
        id: test_id,
        ...category
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
    preload: jest.fn((category)=>{
      console.log('CATEGORY PRELOAD ES: '+JSON.stringify(category));
      let obj = {};
      Object.keys(createDto)
      .forEach(k => obj[k] = (category[k] ?? createDto[k]));
      return {id:test_id,...obj};
    }),
    remove: jest.fn((id)=>{
      return {
        id ,
        ...createDto
      }
    })
  };


  const CATEGORY_REPOSITORY_TOKEN = getRepositoryToken(Category); 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService,
      {
        provide: CATEGORY_REPOSITORY_TOKEN,
        useValue : categoriesRepository
      }],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
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

  it('should create a category and return category with id', async () => {
    expect(await service.create(createDto)).toEqual({
      id:test_id,
      ...createDto
    });
  });

  it('should get an array with a list of categories', async () => {
    const data = await service.findAll();
    expect(data).toEqual([]);
    expect(Array.isArray(data)).toBe(true);
  });

  it('should find a category with an id', async () => {
    expect(await service.findOne(test_id)).toEqual({
      id:test_id,
      ...createDto
    });
  });

  it('should update a category and return the category', async () => {
    expect(await service.update(test_id,{id:test_id,title:title_changed})).toEqual({
      ...createDto,
      id:test_id,
      title:title_changed
    });
  });

  it('should remove a category and return category with id', async () => {
    expect(await service.remove(test_id)).toEqual({
      id:1,
      ...createDto
    });
  });
});
