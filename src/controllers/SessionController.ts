import { Request, Response } from 'express'
import UserRepository from '../repositories/UserRepositoriy';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

class SessionController {

  async create(request: Request, response: Response) {

    const { username, password } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ username });

    if (!user) {
      return response.status(400).json({ message: "User not found" })
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      return response.status(400).json({ message: "username/password combination is wrong" });
    }

    const token = sign({}, 'oifhqwvty@b@@!uy98yr182', {
      subject: user.id,
      expiresIn: '1d'
    });

    delete user.password

    return response.json({ user, token })
  }
}

export default SessionController  