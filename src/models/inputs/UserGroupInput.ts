import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { TagInput, UserInput } from '.';

@InputType()
export class UserGroupInput{

  @Field()
  @MaxLength(30)
  name! : string;

  @Field({ nullable: true })
  focalPoint?: UserInput;

  @Field( type => [UserInput], { nullable: true })
  @MaxLength(60)
  members?: UserInput[];

  @Field( type => [TagInput], { nullable: true } )
  tags!: TagInput[];

}