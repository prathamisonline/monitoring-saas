import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
  async removeUsersProject(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    console.log('project.ownerId', project.ownerId, userId, projectId);
    if (!project || project.ownerId != userId) {
      throw new ForbiddenException('You cannot delete this project');
    }
    return this.prisma.project.delete({ where: { id: projectId } });
  }
}
