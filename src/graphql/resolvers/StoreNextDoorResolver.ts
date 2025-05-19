import { Arg, Args, Int, Query, Resolver } from "type-graphql";
import StoreNextDoorModel from "../../rest/models/StoreNextDoorModel";
import { StoreNextDoorArgs } from "../arguments/StoreNextDoorArgs";
import { StoreNextDoor } from "../schemas/StoreNextDoor";
import { getDataFromCollection } from "../util";

@Resolver()
export class StoreNextDoorResolver {
  @Query(() => [StoreNextDoor])
  async storeNextDoor(
    @Arg("storeNextDoorId", (type) => Int) storeId: number
  ): Promise<StoreNextDoor[]> {
    return StoreNextDoorModel.find({ id: storeId });
  }

  @Query(() => [StoreNextDoor])
  async storeNextDoorByIds(
    @Arg("storeNextDoorIds", (type) => [Int]) storeIds: number[]
  ): Promise<StoreNextDoor[]> {
    return StoreNextDoorModel.find({ id: { $in: storeIds } });
  }

  @Query(() => [StoreNextDoor])
  async storesNextDoor(@Args() filter: StoreNextDoorArgs): Promise<StoreNextDoor[]> {
    return getDataFromCollection("storeNextDoor", filter) as Promise<StoreNextDoor[]>;
  }
}
