import {
  Post,
  Req,
  Res,
  Body,
  Controller,
  Get,
  UseFilters,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { MediaService } from './media.service';
import { CreateMediaDto } from './media.dto';
import { HttpExceptionFilter } from 'src/utils/http-exception.filter';
import { MESSAGES, queryType } from 'src/utils/helpers';

@Controller('media')
@UseFilters(new HttpExceptionFilter())
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
  @Post('/')
  async createMedia(@Res() res: Response, @Body() body: CreateMediaDto) {
    const result = await this.mediaService.createMedia(body);
    res.status(result.statusCode).send(result);
  }

  @Get('/')
  async getAllMedia(@Query() query: queryType, @Res() res: Response) {
    console.log(query);
    const result = await this.mediaService.findAllMedia(query);
    res.status(result.statusCode).send(result);
  }

  @Get('/search')
  async getMediaBySearch(@Query() q: { query: string }, @Res() res: Response) {
    console.log('2344');
    const result = await this.mediaService.findMediaBySearch(q.query);
    res.status(result.statusCode).send(result);
  }
  @Get('/:id')
  async getMediaById(@Param() params: { id: string }, @Res() res: Response) {
    const result = await this.mediaService.findMediaById(params.id);
    res.status(result.statusCode).send(result);
  }

  @Patch('/:id')
  async updateMediaById(
    @Param() params: { id: string },
    @Res() res: Response,
    @Body() body: CreateMediaDto,
  ) {
    const result = await this.mediaService.updateMediaById(params.id, body);
    res.status(result.statusCode).send({ ...result, data: null });
  }

  @Delete('/:id')
  async deleteMediaById(@Param() params: { id: string }, @Res() res: Response) {
    const result = await this.mediaService.deleteMediaById(params.id);
    res.status(result.statusCode).send({ ...result, data: null });
  }
}
