import { Test, TestingModule } from '@nestjs/testing';
import { CreateTypesItemInput } from './dto/inputs';
import { TypesItemsResolver } from './types_items.resolver';
import { TypesItemsService } from './types_items.service';

describe('TypesItemsResolver', () => {
  let resolver: TypesItemsResolver;
  let typeItemMockService : TypesItemsService;
  let test_id = 1;
  let title_changed = 'Type Item changed';

  let createDto = new CreateTypesItemInput();
  (createDto.title='Type Item Test'),(createDto.description='Type Item description');

  const typesItemsService = {
    create: jest.fn((typeItem)=>{
      return {
        id: test_id ,
        ...typeItem
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
    update: jest.fn((id,typeItem)=>{
      let obj = {};
      Object.keys(createDto)
      .forEach(k => obj[k] = (typeItem[k] ?? createDto[k]));
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
      providers: [TypesItemsResolver,
      {
        provide: TypesItemsService,
        useValue: typesItemsService
      }],
    }).compile();

    resolver = module.get<TypesItemsResolver>(TypesItemsResolver);
    typeItemMockService = module.get<TypesItemsService>(TypesItemsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should have create function', () => {
    expect(resolver.createTypesItem).toBeDefined();
  })
  
  it('should have findAll function', () => {
    expect(resolver.findAll).toBeDefined();
  })

  it('should have findOne function', () => {
    expect(resolver.findOne).toBeDefined();
  })

  it('should have update function', () => {
    expect(resolver.updateTypesItem).toBeDefined();
  })

  it('should have remove function', () => {
    expect(resolver.removeTypesItem).toBeDefined();
  })

  it('should create a typeItem and return typeItem with id', async () => {
    const data = await resolver.createTypesItem(createDto);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(typeItemMockService.create).toBeCalled();
  });

  it('should find array of typesItems (AlltypesItems)', async () => {
    const data = await resolver.findAll();
    expect(typeItemMockService.findAll).toBeCalled();
    expect(Array.isArray(data)).toBe(true);
  });

  it('should find one typeItem', async () => {
    const data = await resolver.findOne(test_id);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(typeItemMockService.findOne).toBeCalled();
  });

  it('should update typeItem', async () => {
    const data = await resolver.updateTypesItem({id:test_id,title:title_changed});
    expect(data).toEqual({
      ...createDto,
      id:test_id,
      title:title_changed
    });
    expect(typeItemMockService.update).toBeCalled();
  });

  it('should remove typeItem', async () => {
    const data = await resolver.removeTypesItem(test_id);
    expect(data).toEqual({
      id:test_id,
      ...createDto
    });
    expect(typeItemMockService.remove).toBeCalled();
  });
});
