import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from '../../utils/decorators/roles.decorator';
import { GqlAuthGuard } from '../../utils/authentication/graphql.guard';
import { RestrictedGroupNames } from '../user-group/user-group.entity';
import { Tagset } from './tagset.entity';
import { TagsetService } from './tagset.service';
import { ITagset } from './tagset.interface';
import { Profiling } from '../../utils/logging/logging.profiling.decorator';
import { ValidationException } from '../../utils/error-handling/exceptions/validation.exception';
import { LogContext } from '../../utils/logging/logging.contexts';

@Resolver(() => Tagset)
export class TagsetResolver {
  constructor(private tagsetService: TagsetService) {}

  @Roles(
    RestrictedGroupNames.CommunityAdmins,
    RestrictedGroupNames.EcoverseAdmins
  )
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tagset, {
    description: 'Replace the set of tags in a tagset with the provided tags',
  })
  @Profiling.api
  async replaceTagsOnTagset(
    @Args('tagsetID') tagsetID: number,
    @Args({ name: 'tags', type: () => [String] }) newTags: string[]
  ): Promise<ITagset> {
    if (!newTags)
      throw new ValidationException(
        `Unable to replace tags on tagset(${tagsetID}`,
        LogContext.COMMUNITY
      );

    return await this.tagsetService.replaceTags(tagsetID, newTags);
  }

  @Roles(
    RestrictedGroupNames.CommunityAdmins,
    RestrictedGroupNames.EcoverseAdmins
  )
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tagset, {
    description: 'Add the provided tag to the tagset with the given ID',
  })
  @Profiling.api
  async addTagToTagset(
    @Args('tagsetID') tagsetID: number,
    @Args({ name: 'tag', type: () => String }) newTag: string
  ): Promise<ITagset> {
    return await this.tagsetService.addTag(tagsetID, newTag);
  }
}
