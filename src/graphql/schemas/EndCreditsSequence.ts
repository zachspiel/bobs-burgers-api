import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class EndCreditsSequence {
  @Field((type) => Int)
  id: number;

  @Field()
  image: string;

  @Field()
  season: number;

  @Field()
  episode: number;

  @Field()
  episodeUrl: number;

  @Field()
  url: string;
}
