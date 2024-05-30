import { Arg, Args, Int, Query, Resolver } from "type-graphql";
import { EpisodeModel } from "../../rest/models";
import { EpisodeArgs } from "../arguments/EpisodeArgs";
import { Episode } from "../schemas/Episode";
import { getDataFromCollection } from "../util";

@Resolver()
export class EpisodeResolver {
  @Query((returns) => [Episode])
  async episode(
    @Arg("episodeId", (type) => Int) episodeId: Number
  ): Promise<Episode[]> {
    return (await EpisodeModel.find({ id: episodeId })) as Episode[];
  }

  @Query((returns) => [Episode])
  async episodeByIds(
    @Arg("episodeIds", (type) => [Int]) episodeIds: [Number]
  ): Promise<Episode[]> {
    return (await EpisodeModel.find({ id: { $in: episodeIds } })) as Episode[];
  }

  @Query((returns) => [Episode])
  async episodes(@Args() filter: EpisodeArgs): Promise<Episode[]> {
    return (await getDataFromCollection("episodes", filter)) as Episode[];
  }
}
