import { Module } from '@nestjs/common';
import { BritishCounsilService } from './british-counsil.service';
import { BritishCounsilController } from './british-counsil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BritishCounsil } from './entities/british-counsil.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BritishCounsil,
    ]),
    FilesModule,
  ],
  controllers: [BritishCounsilController],
  providers: [BritishCounsilService],
})
export class BritishCounsilModule { }
