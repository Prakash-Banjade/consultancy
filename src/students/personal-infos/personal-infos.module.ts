import { Module } from '@nestjs/common';
import { PersonalInfosService } from './personal-infos.service';
import { PersonalInfosController } from './personal-infos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalInfo } from './entities/personal-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonalInfo
    ])
  ],
  controllers: [PersonalInfosController],
  providers: [PersonalInfosService],
})
export class PersonalInfosModule {}
