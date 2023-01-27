import { Test, TestingModule } from '@nestjs/testing';
import { CreateTypesItemInput } from './dto/inputs';
import { TypesItemsService } from './types_items.service';
import { TypesItem } from './entities/types_item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TypesItemsService', () => {
  let service: TypesItemsService;
  const test_id = 1;
  const title_changed = 'Type Item changed';

  let createDto = new CreateTypesItemInput();
  (createDto.title='Type Item Test'),(createDto.description='Type Item description');

  let typesItemsRepository = {
    create: jest.fn().mockImplementation((payload)=>payload),
    save: jest.fn().mockImplementation((typeItem)=>
      Promise.resolve({
        id: test_id,
        ...typeItem
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
    preload: jest.fn((typeItem)=>{
      console.log('TYPEITEM PRELOAD ES: '+JSON.stringify(typeItem));
      let obj = {};
      Object.keys(createDto)
      .forEach(k => obj[k] = (typeItem[k] ?? createDto[k]));
      return {id:test_id,...obj};
    }),
    remove: jest.fn((id)=>{
      return {
        id ,
        ...createDto
      }
    })
  };


  const TYPEITEM_REPOSITORY_TOKEN = getRepositoryToken(TypesItem); 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypesItemsService,
      {
        provide: TYPEITEM_REPOSITORY_TOKEN,
        useValue : typesItemsRepository
      }],
    }).compile();

    service = module.get<TypesItemsService>(TypesItemsService);
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

  it('should create a typeItem and return typeItem with id', async () => {
    expect(await service.create(createDto)).toEqual({
      id:test_id,
      ...createDto
    });
  });

  it('should get an array with a list of typesItems', async () => {
    const data = await service.findAll();
    expect(data).toEqual([]);
    expect(Array.isArray(data)).toBe(true);
  });

  it('should find a typeItem with an id', async () => {
    expect(await service.findOne(test_id)).toEqual({
      id:test_id,
      ...createDto
    });
  });

  it('should update a typeItem and return the typeItem', async () => {
    expect(await service.update(test_id,{id:test_id,title:title_changed})).toEqual({
      ...createDto,
      id:test_id,
      title:title_changed
    });
  });

  it('should remove a typeItem and return typeItem with id', async () => {
    expect(await service.remove(test_id)).toEqual({
      id:1,
      ...createDto
    });
  });
});
