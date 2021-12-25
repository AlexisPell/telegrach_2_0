import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ROLES_KEY } from '../auth.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> {
    try {
      const requiredRoles: string[] = this.reflector.getAllAndOverride(
        ROLES_KEY,
        [ctx.getHandler(), ctx.getClass()],
      );
      if (!requiredRoles) return true;
      const user = ctx.switchToHttp().getRequest().user;
      if (!user) {
        throw new UnauthorizedException('Sorry, no active user session');
      }
      return user.roles.some((role: string) => requiredRoles.includes(role));
    } catch (error) {
      throw new UnauthorizedException('Sorry, unauthorized');
    }
  }
}
