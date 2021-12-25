import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    console.log('AUTH GUARD // INIT');
    const req: Express.Request = context.switchToHttp().getRequest();

    const isAuthenticated = req.isAuthenticated();
    console.log('AUTH GUARD // isAuthenticated: ', isAuthenticated);

    if (!isAuthenticated) {
      throw new UnauthorizedException('Sorry, unauthorized for this');
    }
    return isAuthenticated;
  }
}
