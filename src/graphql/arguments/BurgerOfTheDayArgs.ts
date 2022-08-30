import { ArgsType, Field } from "type-graphql";
import { DefaultArgs } from "./DefaultArgs";

@ArgsType()
export class BurgerOfTheDayArgs extends DefaultArgs {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  season?: number;

  @Field({ nullable: true })
  episode?: number;
}
