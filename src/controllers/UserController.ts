import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepositoriy';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs'

class UserController {
  async create(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const { name, password, username } = request.body;

    const userExists = await userRepository.findOne({ username })

    if (userExists) {
      return response.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await hash(password, 8)

    const user = userRepository.create({ name, password: hashedPassword, username });

    await userRepository.save(user);

    delete user.password;

    return response.status(201).json(user)

  }

}

export default UserController