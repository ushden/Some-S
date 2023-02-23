import {CanActivate, ExecutionContext, Inject, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Observable} from 'rxjs';
import {Logger} from 'winston';
import {WINSTON_MODULE_PROVIDER} from 'nest-winston';

export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const token = req.headers?.authorization;

      if (!token) {
        return true;
      }

      req.user = this.jwtService.verify(token);

      return true;
    } catch (e) {
      this.logger.error(`AG001: Error in auth guard. Error: ${e.message}`);

      throw new UnauthorizedException({message: e.message});
    }
  }
}