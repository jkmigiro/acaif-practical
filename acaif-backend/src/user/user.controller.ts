
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
import ICrud from 'src/interfaces/crud.interface';
import { AuthGuard } from '@nestjs/passport';


type PartialCrud = Partial<ICrud<User>>
@Controller('users')
export class UserController implements PartialCrud {
    constructor(private userService: UserService) { }

    @Post()
    async create(@Body() createUser: User) {
        this.userService.create(createUser);
    }

    @Get()
    @UseGuards(AuthGuard("jwt"))
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get()
    @UseGuards(AuthGuard("jwt"))
    async findById(id: any): Promise<User | null> {
        return this.userService.findById(id)
    }
}
