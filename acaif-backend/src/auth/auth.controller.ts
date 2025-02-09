import { Controller, Post, Body, Logger } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() user: { email: string; password: string }) {
    Logger.log("Logging in")
    return this.authService.login(user);
  }
}
