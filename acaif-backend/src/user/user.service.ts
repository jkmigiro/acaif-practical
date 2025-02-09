
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import ICrud from 'src/interfaces/crud.interface';
import * as bcrypt from 'bcrypt';

type PartialCrud = Partial<ICrud<User>>
@Injectable()
export class UserService implements PartialCrud{
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUser: User): Promise<User> {
    bcrypt.hash(createUser.password,10).then(pwd => createUser.password=pwd).catch(error => {
      throw new Error(error)
    })
    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: any): Promise<User|null> {
      return this.userModel.findById(id).exec()
  }
}
