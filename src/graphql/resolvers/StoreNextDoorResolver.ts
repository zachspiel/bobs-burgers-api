import { FilterQuery } from "mongoose";
import { Arg, Args, Int, Query, Resolver } from "type-graphql";
import StoreNextDoorModel from "../../rest/models/StoreNextDoorModel";
import { StoreNextDoorArgs } from "../arguments/StoreNextDoorArgs";
import { StoreNextDoor } from "../schemas/StoreNextDoor";
import { createFilterById, createFilterByIds, getDataFromCollection } from "../util";

@Resolver((of) => StoreNextDoor)
export class StoreNextDoorResolver {
  @Query((returns) => [StoreNextDoor])
  async episode(
    @Arg("storeNextDoorId", (type) => Int) storeId: number
  ): Promise<StoreNextDoor[]> {
    const filter = createFilterById(storeId);
    return StoreNextDoorModel.find({ id: storeId });
  }

  async episodeByIds(
    @Arg("storeNextDoorIds", (type) => [Int]) storeIds: number[]
  ): Promise<StoreNextDoor[]> {
    return StoreNextDoorModel.find({ id: { $in: storeIds } });
  }

  @Query((returns) => [StoreNextDoor])
  async storesNextDoor(@Args() filter: StoreNextDoorArgs): Promise<StoreNextDoor[]> {
    return (await getDataFromCollection("storeNextDoor", filter)) as StoreNextDoor[];
  }
}
