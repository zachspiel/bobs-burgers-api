import { ArgsType, Field } from "type-graphql";
import { DefaultArgs } from "./DefaultArgs";

@ArgsType()
export class CharacterArgs extends DefaultArgs {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  hairColor?: string;

  @Field({ nullable: true })
  age?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  occupation?: string;

  @Field({ nullable: true })
  firstEpisode?: string;

  @Field({ nullable: true })
  voicedBy?: string;
}
