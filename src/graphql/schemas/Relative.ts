import { prop } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Relative {
  @Field()
  @prop({ required: true })
  name: string;

  @Field({ nullable: true })
  wikiUrl: string;

  @Field({ nullable: true })
  url: string;
}
