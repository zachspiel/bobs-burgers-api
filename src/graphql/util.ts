import { DefaultArgs } from "./arguments/DefaultArgs";
import { getData, Model } from "../rest/controllers/controller";

export const getDataFromCollection = async <T extends DefaultArgs>(
  route: Model,
  filter: T
): Promise<unknown[]> => {
  const { sortBy, limit, skip, orderBy, ...data } = filter;
  return getData(route, data, {
    sort: { [sortBy]: orderBy === "asc" ? 1 : -1 },
    limit: limit,
    skip: skip,
  });
};
