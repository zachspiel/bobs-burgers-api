import { Request } from "express";
import { QueryOptions } from "mongoose";

const MAX_DOCUMENTS = 600;

const getOptions = (req: Request): QueryOptions => {
  const options: QueryOptions = {};
  const limit = req.query.limit?.toString() ?? "";
  const skip = req.query.skip?.toString() ?? "";

  if (req.query.sortBy) {
    const sortByKey = req.query?.sortBy.toString();
    const orderBy = req.query?.OrderBy ?? "";

    options.sort = {
      [sortByKey]: orderBy === "desc" ? -1 : 1,
    };
  } else {
    options.sort = { id: 1 };
  }

  if (!isNaN(parseInt(limit))) {
    options.limit = parseInt(limit);
  } else {
    options.limit = MAX_DOCUMENTS;
  }

  if (!isNaN(parseInt(skip))) {
    options.skip = parseInt(skip);
  } else {
    options.skip = 0;
  }

  return options;
};

const getFilters = (req: Request) => {
  const optionKeys = ["limit", "skip", "sortBy", "OrderBy"];
  const keys = Object.keys(req.query).filter(
    (key) => !optionKeys.includes(key)
  );

  const filters: Record<string, any> = {};

  keys.forEach((key) => {
    filters[key] = req.query[key];
  });

  return filters;
};

const getArrayParameters = (id: string) => {
  const idArray = isArray(id)
    ? JSON.parse(id).map(Number)
    : id.split(",").map(Number);

  return { id: { $in: idArray } };
};

const isArray = (id: string) => {
  return /\[.+\]$/.test(id);
};

const isCommaSeparated = (id: string) => {
  return id.includes(",") && !isArray(id) && id.length > 1;
};

export {
  getOptions,
  getFilters,
  getArrayParameters,
  isArray,
  isCommaSeparated,
};
