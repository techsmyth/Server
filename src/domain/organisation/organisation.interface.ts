import { IChallenge } from '../challenge/challenge.interface';
import { IDID } from '../did/did.interface';
import { ITagset } from '../tagset/tagset.interface';
import { IUserGroup } from '../user-group/user-group.interface';

export interface IOrganisation {
  id: number;
  name: string;
  DID: IDID;
  tagset?: ITagset;
  challenges?: IChallenge[];
  groups?: IUserGroup[];
  restrictedGroupNames?: string[];
}
