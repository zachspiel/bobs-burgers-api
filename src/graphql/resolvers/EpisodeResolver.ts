import { Arg, Args, Int, Query, Resolver } from "type-graphql";
import EpisodeModel from "../../rest/models/EpisodeModel";
import { EpisodeArgs } from "../arguments/EpisodeArgs";
import { Episode } from "../schemas/Episode";
import { getDataFromCollection } from "../util";

@Resolver()
export class EpisodeResolver {
  @Query((returns) => [Episode])
  async episode(@Arg("episodeId", (type) => Int) episodeId: Number): Promise<Episode[]> {
    return EpisodeModel.find({ id: episodeId });
  }

  @Query((returns) => [Episode])
  async episodeByIds(
    @Arg("episodeIds", (type) => [Int]) episodeIds: [Number]
  ): Promise<Episode[]> {
    return EpisodeModel.find({ id: { $in: episodeIds } });
  }

  @Query((returns) => [Episode])
  async episodes(@Args() filter: EpisodeArgs): Promise<Episode[]> {
    return getDataFromCollection("episodes", filter) as Promise<Episode[]>;
  }
}
