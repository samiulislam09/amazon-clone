import { Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfoInterface } from './user-info.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/:id')
  getUser(@Param("id") id: string){
    return this.userService.findUserById(id);
  }
}
