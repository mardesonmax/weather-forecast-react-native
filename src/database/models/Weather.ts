import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class Weather extends Model {
  static table = 'weathers';

  @field('name')
  name!: string;

  @field('country')
  country!: string;

  @field('formatted_address')
  formatted_address!: string;

  @field('lng')
  lng!: number;

  @field('lat')
  lat!: number;

  @field('favorite')
  favorite!: boolean;
}

export { Weather };
