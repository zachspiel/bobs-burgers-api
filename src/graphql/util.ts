import { QueryOptions } from "mongoose";
import { DefaultArgs } from "./arguments/DefaultArgs";
import { getData, Model } from "../rest/controllers/controller";

const getOptionsFromArgs = <T extends DefaultArgs>(
  filter: T
): QueryOptions<unknown> => {
  const { sortBy, limit, skip, orderBy, ...data } = filter;

  return {
    sort: { [sortBy]: orderBy === "asc" ? 1 : -1 },
    limit: limit,
    skip: skip,
  };
};

export const getDataFromCollection = async <T extends DefaultArgs>(
  route: Model,
  filter: T
): Promise<unknown[]> => {
  const { sortBy, limit, skip, orderBy, ...data } = filter;
  return await getData(route, { ...data }, getOptionsFromArgs(filter));
};
