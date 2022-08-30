import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class DefaultArgs {
  @Field({ defaultValue: "id" })
  sortBy: string;

  @Field({ defaultValue: "asc" })
  orderBy: string;

  @Field({ defaultValue: 600 })
  limit: number;

  @Field({ defaultValue: 0 })
  skip: number;
}
