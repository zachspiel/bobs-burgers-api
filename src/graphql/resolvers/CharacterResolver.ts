import { Arg, Args, Int, Query, Resolver } from "type-graphql";
import { Character } from "../schemas/Character";
import CharacterModel from "../../rest/models/CharacterModel";
import { CharacterArgs } from "../arguments/CharacterArgs";
import { getDataFromCollection } from "../util";

@Resolver()
export class CharacterResolver {
  @Query((returns) => [Character])
  async character(
    @Arg("characterId", (type) => Int) characterId: number
  ): Promise<Character[]> {
    return CharacterModel.find({ id: characterId });
  }

  @Query((returns) => [Character])
  async characterByIds(
    @Arg("characterIds", (type) => [Int]) characterIds: number[]
  ): Promise<Character[]> {
    return CharacterModel.find({ id: { $in: characterIds } });
  }

  @Query((returns) => [Character])
  async characters(@Args() filter: CharacterArgs): Promise<Character[]> {
    return getDataFromCollection("characters", filter) as Promise<Character[]>;
  }
}
