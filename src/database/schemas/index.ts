import { appSchema } from '@nozbe/watermelondb';

import { weatherSchema } from './weatherSchema';

const schemas = appSchema({
  version: 1,
  tables: [weatherSchema],
});

export { schemas };
