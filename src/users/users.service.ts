import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateUserRequest } from './dto/create-user';
import { hash } from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserRequest: CreateUserRequest) {
    const newUser = await new this.userModel({
      ...createUserRequest,
      password: await hash(createUserRequest.password, 10),
    });

    const response = await newUser.save();
    return response;
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    return {
      users,
    };
  }

  async getUser(email: string) {
    const user = await this.userModel.findOne<User>({
      email,
    });
    //   .select('-password');
    return user;
  }

  // tutorial implementations
  async getUser2(query: FilterQuery<User>) {
    const user = (await this.userModel.findOne(query)).toObject();
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async updateUser(query: FilterQuery<User>, data: UpdateQuery<User>) {
    return this.userModel.findOneAndUpdate(query, data);
  }
}

// 'ff4bcaae-70d4-4453-8f3b-136593ea072c'
// '5a674674-75b5-44ed-8a77-7d7d765fecb7'
// '68c3e998-ee56-4328-957b-858681640848'
// 'c635b784-57cf-402f-b90b-ac0434d6c0ee'
