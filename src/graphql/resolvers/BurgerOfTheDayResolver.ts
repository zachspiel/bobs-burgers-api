import { Arg, Args, Int, Query, Resolver } from "type-graphql";
import { getDataFromCollection } from "../util";
import BurgerOfTheDayModel from "../../rest/models/BurgerOfTheDayModel";
import { BurgerOfTheDayArgs } from "../arguments/BurgerOfTheDayArgs";
import { BurgerOfTheDay } from "../schemas/BurgerOfTheDay";

@Resolver((of) => BurgerOfTheDay)
export class BurgerOfTheDayResolver {
  @Query((returns) => [BurgerOfTheDay])
  async burgerOfTheDay(
    @Arg("burgerId", (type) => Int) burgerId: number
  ): Promise<BurgerOfTheDay[]> {
    return await BurgerOfTheDayModel.find({ id: burgerId });
  }

  @Query((returns) => [BurgerOfTheDay])
  async burgerOfTheDayByIds(
    @Arg("burgerIds", (type) => [Int]) burgerIds: [number]
  ): Promise<BurgerOfTheDay[]> {
    return await BurgerOfTheDayModel.find({ id: { $in: burgerIds } });
  }

  @Query((returns) => [BurgerOfTheDay])
  async burgersOfTheDay(@Args() filter: BurgerOfTheDayArgs): Promise<BurgerOfTheDay[]> {
    return (await getDataFromCollection("burgerOfTheDay", filter)) as BurgerOfTheDay[];
  }
}
