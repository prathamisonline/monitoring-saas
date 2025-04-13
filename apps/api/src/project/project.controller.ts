import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Req() req: Request, @Body() body: { name: string; description: string }) {
    const user = req.user as any;
    return this.projectService.createProject(user.id, body.name, body.description);
  }

  @Get()
  async getProjects(@Req() req: Request) {
    console.log('Cookies:', req.cookies); // 👈 Check if auth_token is visible
    console.log('User:', req.user); // 👈 After JWT parsing
    const user = req.user as any;
    return this.projectService.getUserProjects(user.id);
  }
}
