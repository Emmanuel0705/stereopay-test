import { Inject, Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { IRes, MESSAGES, queryType } from 'src/utils/helpers';
import tryCatch, { QueryBuilder } from 'src/utils/tryCatch';
import { Repository } from 'typeorm';
import { CreateMediaDto, UpdateMediaDto } from './media.dto';
import { Media } from './media.entity';

config();

@Injectable()
export class MediaService {
  constructor(
    @Inject('MEDIA_REPOSITORY')
    private mediaRepository: Repository<Media>,
  ) {}

  async createMedia(data: CreateMediaDto): Promise<IRes<Media>> {
    const entity: Media = this.mediaRepository.create(data);
    const promise: Promise<Media> = this.mediaRepository.save(entity);

    return tryCatch(promise, MESSAGES.created);
  }
  async findAllMedia(query: queryType): Promise<IRes<Media[]>> {
    const { page, perpage } = query;
    const promise: Promise<[Media[], number]> =
      this.mediaRepository.findAndCount({
        skip: (page - 1) * perpage,
        take: perpage,
        where: { deletedAt: null },
      });

    return QueryBuilder(promise as any, MESSAGES.found);
  }

  async findMediaById(id: string): Promise<IRes<Media>> {
    const promise: Promise<Media> = this.mediaRepository.findOneBy({
      id,
      deletedAt: null,
    });

    return tryCatch(promise, MESSAGES.found);
  }

  async findMediaBySearch(query: string): Promise<IRes<Media>> {
    const promise: Promise<Media[]> = this.mediaRepository
      .createQueryBuilder('media')
      .where('media.name LIKE :query', { query: `%${query}%` })
      .orWhere('media.description LIKE :query', { query: `%${query}%` })
      .getMany();

    return tryCatch(promise as any, MESSAGES.found);
  }

  async updateMediaById(
    id: string,
    data: UpdateMediaDto,
  ): Promise<IRes<Media>> {
    const promise: Promise<any> = this.mediaRepository.update({ id }, data);
    const result = tryCatch(promise, MESSAGES.updated);

    return result;
  }

  async deleteMediaById(id: string): Promise<IRes<Media>> {
    const promise: Promise<any> = this.mediaRepository.update(
      { id },
      { deletedAt: new Date() },
    );
    return tryCatch(promise, MESSAGES.deleted);
  }
}
