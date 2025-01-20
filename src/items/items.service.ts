import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Injectable allows us to inject this as a dependancy into a contructor

@Injectable()
export class ItemsService {
  // initialy we would have database data, but in this example we have hardcoded data
  // private readonly items: Item[] = [
  //   {
  //     id: '1',
  //     name: 'Item One',
  //     quantity: 100,
  //     decription: 'This is item one',
  //   },
  //   {
  //     id: '2',
  //     name: 'Item Two',
  //     quantity: 100,
  //     decription: 'This is item two',
  //   },
  // ];

  // data with mongodb
  // we need constructor because we are using dependency injection
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  // findAll(): Item[] {
  //   if (!this.items) {
  //     throw new NotFoundException(`Not found`);
  //   }
  //   return this.items;
  // }
  async findAll(): Promise<Item[]> {
    // mongoose returns a Promise, so we want to use async await
    // we can now use any mongoose method with this.itemModel.(any method like find, create, findOne...)
    const items = await this.itemModel.find();
    if (!items) {
      throw new NotFoundException(`Not found`);
    }
    return items;
  }

  // findOne(id: string): Item {
  //   // Item (without [] because we want single item)
  //   const item = this.items.find((item) => item.id === id);
  //   if (!item) throw new NotFoundException(`Item with id ${id} not found`);
  //   return item;
  // }
  async findOne(id: string): Promise<Item> {
    try {
      return await this.itemModel.findOne({ _id: id }); // findOne() takes in an object, and mongodb always gives and _id as id value and we are matching it to the id that is passed in -> _id: id
    } catch (error) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
  }

  // // create new Item in our mongodb
  // async create(item: Item): Promise<Item> {
  //   const newItem = new this.itemModel(item);
  //   return await newItem.save(); // this is gonna return whatever this new item is... it's gonna get saved and it's gonna retrun along the id that's automatically aded by mongodb
  // }
  async create(item: Item): Promise<Item> {
    try {
      // Create a new instance of the Item model
      const newItem = new this.itemModel(item);
      // Try to save the new item to the database
      return await newItem.save(); // this is gonna return whatever this new item is... it's gonna get saved and it's gonna retrun along the id that's automatically aded by mongodb
    } catch (error) {
      // Handle validation or database-related errors

      // If the error is a validation error, throw a BadRequestException with a meaningful message
      if (error.name === 'ValidationError') {
        throw new BadRequestException(`Validation failed: ${error.message}`);
      }
      // Catch other errors (e.g., database errors) and throw an InternalServerErrorException
      throw new InternalServerErrorException(
        `Error creating item: ${error.message}`,
      );
    }
  }

  // update Item
  async update(id: string, updatedItem: Item): Promise<Item> {
    try {
      return await this.itemModel.findByIdAndUpdate(id, updatedItem, {
        new: true, // setting { new: true } tells Mongoose to return the updated document after the update has been applied, instead of the original document.
        runValidators: true, // Ensures validation rules defined in the schema are applied
      });
    } catch (error) {
      // Handle validation errors from Mongoose
      if (error.name === 'ValidationError') {
        throw new BadRequestException('Invalid data provided for the update');
      }

      // Catch other types of unexpected errors
      throw new InternalServerErrorException(error.message);
    }
  }

  // delete Item
  async delete(id: string): Promise<Item> {
    let item;
    try {
      item = await this.itemModel.findByIdAndDelete(id);
      return item;
    } catch (error) {
      if (!item) throw new NotFoundException(`Item with id ${id} not found`);
      throw new InternalServerErrorException(
        'An error occurred while deleting the item',
      );
    }
  }
}
