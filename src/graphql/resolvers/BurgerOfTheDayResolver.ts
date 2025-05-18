import { Arg, Args, Int, Query, Resolver } from "type-graphql";
import { getDataFromCollection } from "../util";
import BurgerOfTheDayModel from "../../rest/models/BurgerOfTheDayModel";
import { BurgerOfTheDayArgs } from "../arguments/BurgerOfTheDayArgs";
import { BurgerOfTheDay } from "../schemas/BurgerOfTheDay";

@Resolver()
export class BurgerOfTheDayResolver {
  @Query((returns) => [BurgerOfTheDay])
  async burgerOfTheDay(
    @Arg("burgerId", (type) => Int) burgerId: number
  ): Promise<BurgerOfTheDay[]> {
    return BurgerOfTheDayModel.find({ id: burgerId });
  }

  @Query((returns) => [BurgerOfTheDay])
  async burgerOfTheDayByIds(
    @Arg("burgerIds", (type) => [Int]) burgerIds: [number]
  ): Promise<BurgerOfTheDay[]> {
    return BurgerOfTheDayModel.find({ id: { $in: burgerIds } });
  }

  @Query((returns) => [BurgerOfTheDay])
  async burgersOfTheDay(@Args() filter: BurgerOfTheDayArgs): Promise<BurgerOfTheDay[]> {
    return getDataFromCollection("burgerOfTheDay", filter) as Promise<BurgerOfTheDay[]>;
  }
}
