import { SetMetadata } from '@nestjs/common';
import { User } from '../users/user.document';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export enum STRATEGIES {
  LOCAL = 'local',
  GOOGLE = 'google',
  DISCORD = 'discord',
}

export type Done = (err: Error | null, user: User | null) => void;
