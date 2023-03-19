import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { MEDIA_STATUS, MEDIA_TYPE } from './media.entity';

export class CreateMediaDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsEnum(MEDIA_TYPE)
  readonly type: MEDIA_TYPE;

  @IsString()
  readonly url: string;

  @IsEnum(MEDIA_STATUS)
  readonly status: MEDIA_STATUS;
}

export class UpdateMediaDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsEnum(MEDIA_TYPE)
  @IsOptional()
  readonly type: MEDIA_TYPE;

  @IsString()
  @IsOptional()
  readonly url: string;

  @IsEnum(MEDIA_STATUS)
  @IsOptional()
  readonly status: MEDIA_STATUS;
}
