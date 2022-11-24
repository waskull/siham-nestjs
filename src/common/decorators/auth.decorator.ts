import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards';
import { ACGuard, Role, UseRoles } from 'nest-access-control';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, ACGuard),
    UseRoles(...roles),
    ApiCookieAuth(),
  );
}

// export function Auth() {
//     return applyDecorators(
//       UseGuards(JwtAuthGuard),
//       ApiBearerAuth(),
//     );
//   }