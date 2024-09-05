import { prop } from "@typegoose/typegoose";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class Episode {
  @Field((type) => Int)
  @prop({ required: true })
  id: number;

  @Field()
  @prop({ required: true })
  name: string;

  @Field()
  @prop({ required: true })
  description: string;

  @Field()
  @prop({ required: true })
  productionCode: string;

  @Field()
  @prop({ required: true })
  airDate: string;

  @Field()
  @prop({ required: true })
  season: number;

  @Field()
  @prop({ required: true })
  episode: number;

  @Field()
  @prop({ required: true })
  totalViewers: string;

  @Field()
  @prop({ required: true })
  url: string;

  @Field()
  @prop({ required: true })
  wikiUrl: string;
}
