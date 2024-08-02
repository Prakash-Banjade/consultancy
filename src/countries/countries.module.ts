import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Country,
    ]),
    FilesModule,
  ],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule { }
