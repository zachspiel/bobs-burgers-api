import { ArgsType, Field } from "type-graphql";
import { DefaultArgs } from "./DefaultArgs";

@ArgsType()
export class EpisodeArgs extends DefaultArgs {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  productionCode?: string;

  @Field({ nullable: true })
  airDate?: string;

  @Field({ nullable: true })
  season?: number;

  @Field({ nullable: true })
  episode?: number;

  @Field({ nullable: true })
  totalViewers?: string;
}
