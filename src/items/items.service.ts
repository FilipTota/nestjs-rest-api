import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

// Injectable allows us to inject this as a dependancy into a contructor

@Injectable()
export class ItemsService {
  // initialy we would have database data, but in this example we have hardcoded data
  private readonly items: Item[] = [
    {
      id: '134521',
      name: 'Item One',
      quantity: 100,
      decription: 'This is item one',
    },
    {
      id: '75364352',
      name: 'Item Two',
      quantity: 100,
      decription: 'This is item two',
    },
  ];
}
