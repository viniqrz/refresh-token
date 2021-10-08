import { compare } from 'bcryptjs';

import { client } from '../../prisma/client';

import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';

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

    // Check if password is correct
    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error("User or password incorrect");
    }
   
    const generateTokenProvider = new GenerateTokenProvider();
    const generateRefreshToken = new GenerateRefreshToken();

    await client.refreshToken.deleteMany({
      where: { userId: userAlreadyExists.id }
    });

    const token = await generateTokenProvider.execute(userAlreadyExists.id);
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };