import { Arg, Args, Int, Query, Resolver } from "type-graphql";
import PestControlTruckModel from "../../rest/models/PestControlTruckModel";
import { PestControlTruckArgs } from "../arguments/PestControlTruckArgs";
import { PestControlTruck } from "../schemas/PestControlTruck";
import { getDataFromCollection } from "../util";

@Resolver()
export class PestControlTruckResolver {
  @Query((returns) => [PestControlTruck])
  async pestControlTruck(
    @Arg("pestControlTruckId", (type) => Int) pestControlTruckId: number
  ): Promise<PestControlTruck[]> {
    return PestControlTruckModel.find({ id: pestControlTruckId });
  }

  @Query((returns) => [PestControlTruck])
  async pestControlTruckByIds(
    @Arg("pestControlTruckIds", (type) => [Int]) pestControlTruckIds: number[]
  ): Promise<PestControlTruck[]> {
    return PestControlTruckModel.find({ id: { $in: pestControlTruckIds } });
  }

  @Query((returns) => [PestControlTruck])
  async pestControlTrucks(
    @Args() filter: PestControlTruckArgs
  ): Promise<PestControlTruck[]> {
    return (await getDataFromCollection(
      "pestControlTruck",
      filter
    )) as PestControlTruck[];
  }
}
