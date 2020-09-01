import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, Index, OneToMany } from 'typeorm';
import { User, Tag, Ecoverse, Challenge } from '.';


@Entity()
@ObjectType()
export class UserGroup extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number | null = null;

  @Field(() => String)
  @Column()
  name: string = '';

  @Field(() => User)
  @OneToOne(type => User)
  @JoinColumn()
  focalPoint?: User;

  @Field(() => [Tag])
  @OneToMany(
    type => Tag,
    tag => tag.userGroup,
    { eager: true, cascade: true },
  )
  tags?: Tag[];

  @Field(() => [User])
  @OneToMany(
    type => User,
    user => user.userGroup,
    { eager: true, cascade: true },
  )
  members?: User[];

  @ManyToOne(
    type => Ecoverse,
    ecoverse => ecoverse.groups
  )
  ecoverse?: Ecoverse;

  @ManyToOne(
    type => Challenge,
    challenge => challenge.groups
  )
  challenge?: Challenge;

  @ManyToOne(
    type => Ecoverse,
    ecoverse => ecoverse.members
  )
  ecoverseMember?: Ecoverse;

  @OneToOne(type => Challenge, challenge => challenge.challengeLeads)
  userGroup?: UserGroup;

  constructor(name: string) {
    super();
    this.name = name;
  }
}