import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('project')
// @UseGuards(JwtAuth)
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(
    @Req() req: Request,
    @Body() body: { name: string; description: string },
  ) {
    const user = req.user as any;
    return this.projectService.createProject(
      user.id,
      body.name,
      body.description,
    );
  }

  @Get()
  async getProjects(@Req() req: Request) {
    const user = req.user as any;
    return this.projectService.getUserProjects(user.id);
  }
}
