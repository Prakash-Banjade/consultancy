import { Module } from '@nestjs/common';
import { CounselorsService } from './counselors.service';
import { CounselorsController } from './counselors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counselor } from './entities/counselor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Counselor,
    ])
  ],
  controllers: [CounselorsController],
  providers: [CounselorsService],
})
export class CounselorsModule { }
