import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs'
import RolesRepository from '../repositories/RoleRepository';

class UserController {
  async create(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const rolesRepository = getCustomRepository(RolesRepository);

    const { name, password, username, roles } = request.body;

    const userExists = await userRepository.findOne({ username })

    if (userExists) {
      return response.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await hash(password, 8);

    const existsRoles = await rolesRepository.findByIds(roles)

    const user = userRepository.create({ name, password: hashedPassword, username, roles: existsRoles });

    await userRepository.save(user);

    delete user.password;

    return response.status(201).json(user)

  }

}

export default UserController