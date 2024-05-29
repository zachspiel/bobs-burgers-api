import { Arg, Args, Int, Query, Resolver } from "type-graphql";
import StoreNextDoorModel from "../../rest/models/StoreNextDoorModel";
import { StoreNextDoorArgs } from "../arguments/StoreNextDoorArgs";
import { StoreNextDoor } from "../schemas/StoreNextDoor";
import { getDataFromCollection } from "../util";

@Resolver()
export class StoreNextDoorResolver {
  @Query((returns) => [StoreNextDoor])
  async storeNextDoor(
    @Arg("storeNextDoorId", (type) => Int) storeId: number
  ): Promise<StoreNextDoor[]> {
    return StoreNextDoorModel.find({ id: storeId });
  }

  @Query((returns) => [StoreNextDoor])
  async storeNextDoorByIds(
    @Arg("storeNextDoorIds", (type) => [Int]) storeIds: number[]
  ): Promise<StoreNextDoor[]> {
    return StoreNextDoorModel.find({ id: { $in: storeIds } });
  }

  @Query((returns) => [StoreNextDoor])
  async storesNextDoor(
    @Args() filter: StoreNextDoorArgs
  ): Promise<StoreNextDoor[]> {
    return (await getDataFromCollection(
      "storeNextDoor",
      filter
    )) as StoreNextDoor[];
  }
}
