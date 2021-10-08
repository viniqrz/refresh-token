import dayjs from "dayjs";

import { client } from "../prisma/client";

class GenerateRefreshToken {

  async execute(userId: string) {
    const expiresIn = dayjs().add(120, 'second').unix();
    
    const generateRefreshToken = await client.refreshToken.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        expiresIn,
        userId
      },
    });

    return generateRefreshToken;
  }
}

export { GenerateRefreshToken };