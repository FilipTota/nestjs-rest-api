import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';

// @ -> decorator
// in order to create endpoint we use decorators.. we dont have like routes file or anything like that, it will just know automatically
@Controller('items')
export class ItemsController {
  // inject ItemsService as dependency (we can call it with this.itemsService. any method we have inside this service)
  constructor(private readonly itemsService: ItemsService) {}
  // itemsService can be whatever we want (we can call it something different if we want)
  // ItemsService is what we imported from './items.service'

  @Get() // -> since we have defined @Get decorator it's gonna tell nest to create an endpint for /items
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id') // -> GET request to endpoing /items/:id
  //   findOne(@Param() param): string {
  //     return `Item ${param.id}`;
  //   }
  findOne(@Param('id') id): Promise<Item> {
    // shorter syntax for @Param() param:
    // @Param('id') id
    // and access it with:
    // `Item ${param.id}`
    return this.itemsService.findOne(id);
  }

  // @Post() // -> POST request on endpoint /items
  // // usually when we send POST req, we are creating an item, so we need to send data, and in order to do that. in nestjs we need to create DTO
  // // DTO = Data Transfer Object
  // // DTO is an object that defines how the data will be sent over the network
  // create(@Body() createItemDto: CreateItemDto): string {
  //   // with (@Body() createItemDto: CreateItemDto) defined inside create() we can access name, desc... that are defined inside body (and the data types are defined inside CreateItemDto which is imported from ./dto/create-item.dto)
  //   return `Name: ${createItemDto.name} Description: ${createItemDto.description}`;
  // }
  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Item> {
    return this.itemsService.delete(id);
  }
}
