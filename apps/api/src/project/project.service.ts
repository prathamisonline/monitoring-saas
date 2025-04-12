import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
// import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  createProject(userId: string, name: string, description?: string) {
    return this.prisma.project.create({
      data: {
        name,
        description,
        ownerId: userId,
      },
    });
  }
  getUserProjects(userId: string) {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
