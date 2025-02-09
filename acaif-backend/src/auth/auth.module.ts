import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "src/user/user.module";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
  imports: [
    MongooseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "admin",
      signOptions: { expiresIn: "1h" },
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, 
    JwtStrategy

  ],

})
export class AuthModule {}
