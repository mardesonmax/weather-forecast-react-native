import { tableSchema } from '@nozbe/watermelondb';

const weatherSchema = tableSchema({
  name: 'weathers',
  columns: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'country',
      type: 'string',
    },
    {
      name: 'lng',
      type: 'number',
    },
    {
      name: 'lat',
      type: 'number',
    },
    {
      name: 'formatted_address',
      type: 'string',
    },
    {
      name: 'favorite',
      type: 'boolean',
    },
  ],
});

export { weatherSchema };
