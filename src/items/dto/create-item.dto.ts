export class CreateItemDto {
  // readonly because we shouldn't be able to directly modify these
  readonly name: string;
  readonly description: string;
  readonly quantity: number;
}
