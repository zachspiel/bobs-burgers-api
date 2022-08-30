import { prop } from "@typegoose/typegoose";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class StoreNextDoor {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field()
  image: string;

  @Field()
  season: number;

  @Field()
  episode: number;

  @Field()
  episodeUrl: string;

  @Field()
  url: string;
}
