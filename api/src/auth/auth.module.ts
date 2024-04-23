import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guard/jwt.guard';
import { JwtStrategy } from './guard/jwt.strategy';

@Module({
  imports: [UserModule, JwtModule.registerAsync({useFactory: ()=>({
    secret: 'samiuls-secret',
    signOptions: {expiresIn:'3600s'}
  })})],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
})
export class AuthModule {}
