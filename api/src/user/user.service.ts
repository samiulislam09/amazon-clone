import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UserInfoInterface } from './user-info.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') readonly userModel: Model<UserDocument>){}

    userInfo(user: UserDocument): UserInfoInterface{
        return {
            id: user._id,
            name: user.name,
            email: user.email
        }
    }

    findUserByEmail(email: string){
        const user = this.userModel.findOne({email});
        return user;
    }

    async findUserById(id: string){
        const user = await this.userModel.findById(id);
        return this.userInfo(user);
    }
    async createUser(name: string, email: string, password: string): Promise<UserDocument>{
        const user = new this.userModel({name, email, password});
        return user.save();
    }
}
