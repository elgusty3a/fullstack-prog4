import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUserDto(newUserDto: CreateUserDto) {
    const existsByEmail = await this.userRepository.findOneBy({
      email: newUserDto.email,
    });
    if (existsByEmail) {
      throw new ConflictException('El email ya existe');
    }
    return this.userRepository.save(newUserDto);
  }

  findAllUsers(): Promise<User[]> {
    console.log(`Esta accion devuelve todos los usuarios`);
    return this.userRepository.find();
  }

  async findOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async updateUserDto(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existsByEmail = await this.userRepository.findOneBy({
        email: updateUserDto.email,
      });
      if (existsByEmail) {
        throw new ConflictException('El email ya está en uso');
      }
    }
    console.log(`Esta accion actualiza el usuario con id #${id}`);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  remove(id: number) {
    console.log(`Esta accion remueve el usuario con id #${id}`);
    return this.userRepository.delete(id);
  }
}
