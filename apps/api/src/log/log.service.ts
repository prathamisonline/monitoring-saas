import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async createLog(data: {
    projectId: string;
    level: string;
    message: string;
    timestamp?: string;
    metadata?: any;
  }) {
    return this.prisma.log.create({
      data: {
        projectId: data.projectId,
        level: data.level,
        message: data.message,
        timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
        metadata: data.metadata,
      },
    });
  }

  async getLogsByProject(projectId: string) {
    return this.prisma.log.findMany({
      where: { projectId },
      orderBy: { timestamp: 'desc' },
    });
  }
  async create(data: any) {
    return this.prisma.log.create({
      data,
    });
  }
  async findByProject(projectId: string) {
    return this.prisma.log.findMany({
      where: { projectId },
      orderBy: { timestamp: 'desc' },
      take: 50, // latest 50 logs
    });
  }

  async searchLogs({
    projectId,
    level,
    search,
    from,
    to,
    page = 1,
    limit = 50,
  }: {
    projectId: string;
    level?: string;
    search?: string;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
  }) {
    const where: Prisma.LogWhereInput = {
      projectId,
      ...(level && { level }),
      ...(search && {
        message: {
          contains: search,
          mode: 'insensitive',
        },
      }),
      ...(from || to
        ? {
            timestamp: {
              ...(from && { gte: new Date(from) }),
              ...(to && { lte: new Date(to) }),
            },
          }
        : {}),
    };

    const [logs, total] = await this.prisma.$transaction([
      this.prisma.log.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.log.count({ where }),
    ]);

    return {
      logs,
      meta: {
        total,
        page,
        limit,
        hasNextPage: page * limit < total,
      },
    };
  }

  async getStats(projectId: string) {
    const [total, infoCount, warnCount, errorCount, logsByDay] = await this.prisma.$transaction([
      this.prisma.log.count({
        where: { projectId },
      }),
      this.prisma.log.count({
        where: { projectId, level: 'info' },
      }),
      this.prisma.log.count({
        where: { projectId, level: 'warn' },
      }),
      this.prisma.log.count({
        where: { projectId, level: 'error' },
      }),
      this.prisma.$queryRaw<{ day: string; count: number }[]>`
      SELECT
        DATE("timestamp") as day,
        COUNT(*) as count
      FROM "Log"
      WHERE "projectId" = ${projectId}
      GROUP BY day
      ORDER BY day DESC
      LIMIT 30
    `,
    ]);

    return {
      total: Number(total),
      byLevel: {
        info: Number(infoCount),
        warn: Number(warnCount),
        error: Number(errorCount),
      },
      daily: logsByDay.map(entry => ({
        day: entry.day,
        count: Number(entry.count),
      })),
    };
  }
}
