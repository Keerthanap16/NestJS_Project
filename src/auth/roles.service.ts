import { Injectable, CanActivate, ExecutionContext, ForbiddenException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt.service'; 
import { PrismaService } from '../prisma.service';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismaService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Ensure the parent JwtAuthGuard has successfully authenticated the user
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false; // If authentication failed, deny access
    }

    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true; // If no roles are required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId; // Get userId from request

    if (!userId) {
      throw new ForbiddenException('Access denied: no user found');
    }

    // Fetch user details directly from the database using PrismaService
    const user = await this.prisma.register_user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ForbiddenException('Access denied: user not found');
    }

    // Check if the user's role is allowed
    return requiredRoles.includes(user.role);
  }
}
