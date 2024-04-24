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

  async findAll() {
    return await this.prismaService.race.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.race.findUnique({
      where: {
        id
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
    const todayRaces = this.prismaService.race.findMany({
      where: {
        date: todayDate
      }
    })

    if (todayRaces) {
      return todayRaces
    }

    return await this.createRaces(
      trackId,
      raceSchedule,
      todayDate
    )
  }
}
