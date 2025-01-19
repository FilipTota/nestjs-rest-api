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

// @ -> decorator
// in order to create endpoint we use decorators.. we dont have like routes file or anything like that, it will just know automatically
@Controller('items')
export class ItemsController {
  @Get() // -> since we have defined @Get decorator it's gonna tell nest to create an endpint for /items
  findAll(): string {
    return 'Get all items';
  }

  @Get(':id') // -> GET request to endpoing /items/:id
  //   findOne(@Param() param): string {
  //     return `Item ${param.id}`;
  //   }
  findOne(@Param('id') id): string {
    // shorter syntax for @Param() param:
    // @Param('id') id
    // and access it with:
    // `Item ${param.id}`
    return `Item ${id}`;
  }

  @Post() // -> POST request on endpoint /items
  // usually when we send POST req, we are creating an item, so we need to send data, and in order to do that. in nestjs we need to create DTO
  // DTO = Data Transfer Object
  // DTO is an object that defines how the data will be sent over the network
  create(@Body() createItemDto: CreateItemDto): string {
    // with (@Body() createItemDto: CreateItemDto) defined inside create() we can access name, desc... that are defined inside body (and the data types are defined inside CreateItemDto which is imported from ./dto/create-item.dto)
    return `Name: ${createItemDto.name} Description: ${createItemDto.description}`;
  }

  @Put(':id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id): string {
    return `Item ${id} updated - Name: ${updateItemDto.name}`;
  }

  @Delete(':id')
  delete(@Param('id') id): string {
    return `Item ${id} deleted`;
  }
}
