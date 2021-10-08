import { sign } from 'jsonwebtoken';


class GenerateTokenProvider {

  async execute(userId: string) {

    const token = sign({}, 'e4b03338-208f-484d-83b7-be91e0ee11a3', {
      subject: userId,
      expiresIn: '20s',
    });

    return token;
  }
}

export { GenerateTokenProvider };