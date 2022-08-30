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
  productionCode?: string;

  @Field()
  airDate?: string;

  @Field()
  season?: number;

  @Field()
  episode?: number;

  @Field()
  totalViewers?: string;

  @Field()
  @prop({ required: true })
  url: string;
}
