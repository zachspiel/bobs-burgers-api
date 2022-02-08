import { Request } from 'express';
import { QueryOptions } from 'mongoose';

const getOptions = (req: Request): QueryOptions => {
  const options: QueryOptions = {};
  const sort: Record<string, number> = {};

  if (req.query.sortBy) {
    const orderBy = req.query?.OrderBy ?? '';
    sort[req.query?.sortBy.toString()] = orderBy === 'desc' ? -1 : 1;

    options.sort = { ...sort };
  }

  if (req.query.limit !== undefined) {
    const limit = req.query.limit.toString();

    if (!isNaN(limit as any)) {
      options.limit = parseInt(limit);
    }
  }

  if (req.query.skip !== undefined) {
    const skip = req.query.skip.toString();

    if (!isNaN(skip as any)) {
      options.skip = parseInt(skip);
    }
  }

  return options;
};

const filterResult = (result: any[], filters: Record<any, any>): any[] => {
  const filtered = result.filter((item) => {
    let isValid = true;

    for (const key in filters) {
      isValid = isValid && item[key] == filters[key];
    }
    return isValid;
  });

  return filtered;
};

export { getOptions, filterResult };