import { Controller, Post, Body, Get, Query, UseGuards, Req } from '@nestjs/common';
import { LogService } from './log.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('logs')
// @UseGuards(JwtAuthGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  async create(@Body() body: any, @Req() req: Request) {
    const user = req.user as any;
    // Optional: validate that this user owns the project
    return this.logService.createLog({
      projectId: body.projectId,
      level: body.level,
      message: body.message,
      timestamp: body.timestamp,
      metadata: body.metadata,
    });
  }

  @Post()
  createLog(@Body() body: any) {
    return this.logService.create(body);
  }

  @Get()
  async getLogs(
    @Query('projectId') projectId: string,
    @Query('level') level?: string,
    @Query('search') search?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '50',
  ) {
    return this.logService.searchLogs({
      projectId,
      level,
      search,
      from,
      to,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  }

  @Get('stats')
  async getLogStats(@Query('projectId') projectId: string) {
    return this.logService.getStats(projectId);
  }
}
