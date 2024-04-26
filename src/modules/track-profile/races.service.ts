import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RaceSchedule } from 'src/@types/globalTypes';
import { PrismaService } from 'src/modules/prisma/prisma.service';

interface RaceTime {
  start: string;
  end: string;
  practiceMinutes: number,
  qualyMinutes: number,
  raceMinutes: number,
  raceLaps: number
}

@Injectable()
export class RacesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    trackId: string,
    createRaceDto: Prisma.RaceCreateInput
  ) {
    return await this.prismaService.race.create({
      data: {
        ...createRaceDto,
        track: {
          connect: {
            id: trackId
          }
        }
      },
    });
  }

  async findAll(trackId: string) {
    const todayDate = new Date().toLocaleDateString('pt-BR')

    const todayRaces = await this.prismaService.race.findMany({
      where: {
        date: todayDate,
        track: {
          id: trackId
        }
      },
      include: {
        track: true,
      }
    })

    return todayRaces
  }

  async findAllWithAllRelations(trackId: string) {
    const todayDate = new Date().toLocaleDateString('pt-BR')

    const todayRaces = await this.prismaService.race.findMany({
      where: {
        date: todayDate,
        track: {
          id: trackId
        }
      },
      include: {
        category: true,
        racerHostProfile: true,
        racersProfiles: true,
      }
    })

    return todayRaces
  }

  async findOne(id: string) {
    return await this.prismaService.race.findUnique({
      where: {
        id
      },
    });
  }

  async findOneWithAllRelations(id: string) {
    return await this.prismaService.race.findUnique({
      where: {
        id
      },
      include: {
        category: true,
        racerHostProfile: true,
        racersProfiles: true,
        track: true
      }
    });
  }

  async update(id: string, updateRaceDto: Prisma.RaceUpdateInput) {
    return await this.prismaService.race.update({
      where: {
        id
      },
      data: updateRaceDto
    });
  }

  async remove(id: string) {
    return await this.prismaService.race.delete({
      where: {
        id
      }
    })
  }

  async generateRaceSchedule(
    openTime: string, 
    closeTime: string, 
    raceInterval: number,
    practiceMinutes: number,
    qualyMinutes: number,
    raceMinutes: number,
    raceLaps: number
  ): Promise<RaceTime[]> {
    const schedule: RaceTime[] = [];
    let currentTime = openTime;

    while (true) {
        let [hours, minutes] = currentTime.split(':').map(str => parseInt(str));
        
        const startTime = new Date(0, 0, 0, hours, minutes);
        
        const endTime = new Date(startTime.getTime() + raceInterval * 60000);

        const endHours = endTime.getHours().toString().padStart(2, '0');
        const endMinutes = endTime.getMinutes().toString().padStart(2, '0');
        const formattedEndTime = `${endHours}:${endMinutes}`;

        if (formattedEndTime > closeTime) {
            break;
        }

        schedule.push({ 
          start: currentTime, 
          end: formattedEndTime,
          practiceMinutes,
          qualyMinutes,
          raceMinutes,
          raceLaps
        });

        currentTime = formattedEndTime;
    }

    return schedule;
  }

  async createRaces(trackId: string, raceSchedule: RaceSchedule, date: string) {
    const {
      openTime,
      closeTime,
      raceInterval,
      practiceMinutes,
      qualyMinutes,
      raceMinutes,
      raceLaps
    } = raceSchedule

    const schedule = await this.generateRaceSchedule(
      openTime,
      closeTime,
      raceInterval,
      practiceMinutes,
      qualyMinutes,
      raceMinutes,
      raceLaps
    )

    // convert the schedule to race schemas
    const races: Prisma.RaceCreateManyInput[] = schedule.map(item => ({
      trackId,
      time: `${item.start} - ${item.end}`,
      date,
      sessions: {
        practiceMinutes: item.practiceMinutes,
        qualyMinutes: item.qualyMinutes,
        raceMinutes: item.raceMinutes,
        raceLaps: item.raceLaps
      },
      isFinished: false,
      isScheduled: false,
      isReserved: false
    }));

    return await this.prismaService.race.createMany({
      data: races
    })
  }

  async generateRaces(trackId: string, raceSchedule: RaceSchedule) {
    const todayDate = new Date().toLocaleDateString('pt-BR')
    const todayRaces = await this.prismaService.race.findMany({
      where: {
        date: todayDate,
        trackId
      }
    })

    if (todayRaces.length) {
      return todayRaces
    }

    return await this.createRaces(
      trackId,
      raceSchedule,
      todayDate
    )
  }

  async racerProfileEnterRace(
    raceId: string,
    racerProfileId: string,
  ) {
    const findRace = await this.findOneWithAllRelations(raceId)

    if (!findRace) return {
      error: 'Corrida não encontrada'
    }

    if (!findRace.racersProfileIds.length) {
      const addRacerAndRacerHost = await this.prismaService.race.update({
        where: {
          id: raceId
        },
        data: {
          racerHostProfile: {
            connect: {
              id: racerProfileId
            }
          },
          racersProfiles: {
            connect: {
              id: racerProfileId
            }
          }
        }
      })

      return addRacerAndRacerHost
    }

    if (findRace.racersProfileIds.includes(racerProfileId)) {
      return {
        error: 'Este Piloto já está nessa corrida'
      }
    }
    const addRacerProfileToRace = await this.prismaService.race.update({
      where: {
        id: raceId
      },
      data: {
        racersProfiles: {
          connect: {
            id: racerProfileId
          }
        }
      }
    })

    return addRacerProfileToRace
  }

  async racerProfileOutRace(
    raceId: string,
    racerProfileId: string,
  ) {
    const findRace = await this.findOneWithAllRelations(raceId)

    if (!findRace) return {
      error: 'Corrida não encontrada'
    }

    if (!findRace.racersProfileIds.includes(racerProfileId)) {
      return {
        error: 'Este Piloto não está na corrida'
      }
    }

    const removeRacerRelationRace = await this.prismaService.race.update({
      where: {
        id: raceId
      },
      data: {
        racersProfiles: {
          disconnect: {
            id: racerProfileId
          }
        }
      }
    })

    if (findRace.racerHost === racerProfileId) {
      return await this.prismaService.race.update({
        where: {
          id: raceId
        },
        data: {
          racersProfiles: {
            disconnect: {
              id: racerProfileId
            }
          }
        }
      })
    }

    return removeRacerRelationRace
  }

  async changeRacerHostProfile(
    oldHost: string,
    newHost: string,
    raceId: string
  ) {
    const findRace = await this.findOneWithAllRelations(raceId)

    if (!findRace) return {
      error: 'Corrida não encontrada'
    }

    if (findRace.racerHost !== oldHost) return {
      error: 'Este não é o atual Host da Corrida'
    }

    await this.prismaService.race.update({
      where: {
        id: raceId
      },
      data: {
        racersProfiles: {
          disconnect: {
            id: oldHost
          },
          connect: {
            id: newHost
          }
        }
      }
    })
  }

  async addCategoryToRace(
    raceId: string,
    categoryId: string,
    trackId: string
  ) {
    const findCategory = await this.prismaService.raceCategories.findUnique({
      where: {
        id: categoryId,
        trackProfileId: trackId
      }
    })

    if (!findCategory) return {
      error: 'Categoria não encontrada'
    }

    const findRace = await this.findOneWithAllRelations(raceId)

    if (!findRace) return {
      error: 'Corrida não encontrada'
    }

    const relationCategoryRace = await this.prismaService.race.update({
      where: {
        id: raceId
      },
      data: {
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    })

    return relationCategoryRace
  }

  async changeCategoryToRace(
    oldCategoryId: string,
    newCategoryId: string,
    raceId: string
  ) {
    const findCategory = await this.prismaService.raceCategories.findUnique({
      where: {
        id: oldCategoryId
      }
    })

    if (!findCategory) return {
      error: 'Categoria não encontrada'
    }

    const findRace = await this.findOneWithAllRelations(raceId)

    if (!findRace) return {
      error: 'Corrida não encontrada'
    }

    const relationCategoryRace = await this.prismaService.race.update({
      where: {
        id: raceId
      },
      data: {
        category: {
          disconnect: true,
          connect: {
            id: newCategoryId
          }
        }
      }
    })

    return relationCategoryRace
  }
}
