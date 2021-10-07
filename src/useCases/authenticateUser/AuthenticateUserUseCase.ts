import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { client } from '../../prisma/client';

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {

  async execute({ username, password }: IRequest) {

    // Check if user already exists
    const userAlreadyExists = await client.user.findFirst({
      where: { username }
    });

    if (!userAlreadyExists) {
      throw new Error("User or password incorrect");
    }

    console.log(JSON.stringify(userAlreadyExists), password);

    // Check if password is correct
    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error("User or password incorrect");
    }

    // gerar token do usuário
    const token = sign({}, 'e4b03338-208f-484d-83b7-be91e0ee11a3', {
      subject: userAlreadyExists.id,
      expiresIn: '20s',
    });

    return token;
  }
}

export { AuthenticateUserUseCase };