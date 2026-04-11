import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    console.log('Buscando users');
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(parseInt(id));
  }

  @Post('')
  postUser(@Body() newUser: CreateUserDto): Promise<User> {
    return this.usersService.postUser(newUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(parseInt(id));
  }

  @Put(':id') //Full update
  updateUser(
    @Param('id') id: string,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(parseInt(id), updatedUser);
  }

  @Patch(':id') //Partial update
  patchUser(
    @Param('id') id: string,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(parseInt(id), updatedUser);
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createUser(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
