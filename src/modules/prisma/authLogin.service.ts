import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AuthLoginService {
  constructor(private readonly prismaService: PrismaService) {}

  TOKEN_TIME = (60 * 60) * 24 * 1000 // 1day milliseconds

  async loginAuthRacer(body: {whatsapp: string, password: string}) {
    const { whatsapp, password } = body
    const racerProfile = await this.getProfileByWhatsapp(whatsapp);

    if (!racerProfile) {
      return {
        error: 'Usuário não encontrado'
      };
    }

    if (racerProfile.password !== password) {
      return {
        error: 'Senha Incorreta'
      };
    }

    const findAuthToken = await this.prismaService.authToken.findFirst({
      where: {
        racerProfileId: racerProfile.id
      },
      select: {
        token: true,
        date: true,
        expired: true,
        time: true,
        racerProfile: true
      }
    });

    if (!findAuthToken) {
      return this.createAuthToken('racer',racerProfile.id);
    } 

    if (this.isTokenExpired(findAuthToken.date)) {
      await this.setTokenExpiredPrisma(findAuthToken.token)
      return this.createAuthToken('racer',racerProfile.id);
    }

    return findAuthToken;
  }

  async loginAuthTrack(body: {email: string, password: string}) {
    const { email, password } = body
    const trackProfile = await this.getProfileByWhatsapp(email);

    if (!trackProfile) {
      return {
        error: 'Kartodromo não encontrado'
      };
    }

    if (trackProfile.password !== password) {
      return {
        error: 'Senha Incorreta'
      };
    }

    const findAuthToken = await this.prismaService.authToken.findFirst({
      where: {
        trackProfileId: trackProfile.id
      },
      select: {
        token: true,
        date: true,
        expired: true,
        time: true,
        trackProfile: true
      }
    });

    if (!findAuthToken) {
      return this.createAuthToken('track',trackProfile.id);
    } 

    if (this.isTokenExpired(findAuthToken.date)) {
      await this.setTokenExpiredPrisma(findAuthToken.token)
      return this.createAuthToken('track',trackProfile.id);
    }

    return findAuthToken;
  }

  async validateToken(token: string) {
    const getToken = await this.getToken(token)

    if (!getToken) return false

    const validateTokenExpired = this.isTokenExpired(getToken.date)

    if (validateTokenExpired) {
      await this.setTokenExpiredPrisma(getToken.token)

      const createToken = getToken.racerProfileId 
      ? await this.createAuthToken('racer',getToken.racerProfileId) 
      : await this.createAuthToken('track',getToken.trackProfileId)
      
      if (createToken) return true

      return false
    }

    return true
  }

  async setTokenExpiredPrisma(token: string) {
    return await this.prismaService.authToken.update({
      where: {
        token
      },
      data: {
        expired: true,
      }
    })
  }


  async getToken(token: string) {
    const findAuthToken = await this.prismaService.authToken.findFirst({
      where: {
        token,
      },
      select: {
        token: true,
        date: true,
        expired: true,
        time: true,
        racerProfile: true,
        racerProfileId: true,
        trackProfile: true,
        trackProfileId: true
      }
    });

    return findAuthToken ? findAuthToken : null
  }

  
  async getTrackByEmail(email: string) {
    const racerProfile = await this.prismaService.trackProfile.findUnique({
      where: {
        email
      }
    });

    return racerProfile;
  }

  async getProfileByWhatsapp(whatsapp: string) {
    const racerProfile = await this.prismaService.racerProfile.findUnique({
      where: {
        whatsapp
      }
    });

    return racerProfile;
  }

  isTokenExpired(tokenDate: Date): boolean {
    const now = new Date();
    const tokenCreationTime = new Date(tokenDate).getTime();
    return (now.getTime() - tokenCreationTime) > this.TOKEN_TIME;
  }

  async createAuthToken(type: 'track' | 'racer', profileId: string) {
    if (type === 'racer') {
      const newToken = await this.prismaService.authToken.create({
        data: {
          expired: false,
          time: this.TOKEN_TIME,
          date: new Date(),
          racerProfile: {
            connect: {
              id: profileId
            }
          }
        }
      });
      return newToken;
    }

    if (type === 'track') {
      const newToken = await this.prismaService.authToken.create({
        data: {
          expired: false,
          time: this.TOKEN_TIME,
          date: new Date(),
          trackProfile: {
            connect: {
              id: profileId
            }
          }
        }
      });
      return newToken;
    }
  }
}

