import { Global, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { AccountsModule } from 'src/accounts/accounts.module';

Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      File,
    ]),
    AccountsModule,
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule { }
