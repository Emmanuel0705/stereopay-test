import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum MEDIA_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum MEDIA_TYPE {
  AUDIO = 'AUDIO',
  IMAGE = 'IMAGE',
}

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: MEDIA_TYPE,
  })
  type: MEDIA_TYPE;

  @Column('varchar')
  url: string;

  @Column({
    type: 'enum',
    enum: MEDIA_STATUS,
  })
  status: MEDIA_STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
