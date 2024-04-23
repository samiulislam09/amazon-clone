import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}

    async register(name: string, email: string, password: string){
        const isUserExist = await this.userService.findUserByEmail(email);
        if(isUserExist){
            throw new BadRequestException('User Already exist');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userService.createUser(name, email, hashedPassword);
        return this.userService.userInfo(user);
    }


    async login(email: string, password: string){
        const user = await this.userService.findUserByEmail(email);
        if(!user){
            throw new NotFoundException("Wrong Credentials");
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            throw new NotFoundException("Wrong Credentails");
        }
        const jwt = await this.jwtService.signAsync({id: user.id, email: user.email});
        return {token: jwt};
    }



}
