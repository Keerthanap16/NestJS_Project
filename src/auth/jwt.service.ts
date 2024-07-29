import { Injectable } from '@nestjs/common';
import { PassportStrategy,AuthGuard } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export interface JwtPayload {
     id: string;
     email: string;
   }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'process.env.JWT_SECRET', 
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.id };
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}


