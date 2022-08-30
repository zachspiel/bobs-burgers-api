import { prop } from "@typegoose/typegoose";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class BurgerOfTheDay {
  @Field((type) => Int)
  @prop({ required: true })
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field()
  @prop({ required: true })
  price: string;

  @Field()
  @prop({ required: true })
  season: number;

  @Field()
  @prop({ required: true })
  episode: number;

  @Field()
  @prop({ required: true })
  episodeUrl: string;

  @Field()
  @prop({ required: true })
  url: string;
}
