import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService) { }



  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email }).exec()
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
  }

  async login(user: { email: string; password: string }) {
    const validUser = await this.validateUser(user.email, user.password);
    return { token: this.jwtService.sign(validUser.toJSON()),_id: validUser._id,email: validUser.email };;
  }
}