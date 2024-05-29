import { ObjectType, Field, Int } from "type-graphql";
import { Relative } from "./Relative";

@ObjectType()
export class Character {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  hairColor?: string;

  @Field({ nullable: true })
  age?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  occupation?: string;

  @Field((type) => [String], { nullable: true })
  allOccupations?: string[];

  @Field((type) => [Relative], { nullable: true })
  relatives?: { name: string; url?: string; wikiUrl?: string }[];

  @Field({ nullable: true })
  firstEpisode?: string;

  @Field({ nullable: true })
  voicedBy?: string;

  @Field()
  url: string;
}
