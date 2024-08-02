import { Module } from '@nestjs/common';
import { BritishCounsilService } from './british-counsil.service';
import { BritishCounsilController } from './british-counsil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BritishCounsil } from './entities/british-counsil.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BritishCounsil,
    ])
  ],
  controllers: [BritishCounsilController],
  providers: [BritishCounsilService],
})
export class BritishCounsilModule { }
