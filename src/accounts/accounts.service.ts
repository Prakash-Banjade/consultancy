import { Inject, Injectable, Scope } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { Counselor } from 'src/counselors/entities/counselor.entity';
import { Student } from 'src/students/entities/student.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/core/repository/base.repository';
import { Roles } from 'src/core/types/global.types';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';

@Injectable({ scope: Scope.REQUEST })
export class AccountsService extends BaseRepository {
  constructor(
    dataSource: DataSource, @Inject(REQUEST) req: Request,
    @InjectRepository(Account) private accountsRepo: Repository<Account>,
  ) {
    super(dataSource, req);
  }

  async createAccount(entity: Counselor | Student, { givenPassword, company }: { givenPassword?: string, company: Company }) {
    // const password = generateRandomPassword();
    const key = entity instanceof Counselor ? Roles.COUNSELLER : Roles.STUDENT;

    const account = this.getRepository<Account>(Account).create({
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      role: key,
      isVerified: true,
      password: givenPassword,
      company,
    })

    console.log({
      entityType: entity.constructor.name,
      password: givenPassword,
      email: entity.email
    })

    // TODO: send email to user

    const savedAccount = await this.getRepository(Account).save(account);

    const user = this.getRepository(User).create({
      account: savedAccount,
      [key]: entity,
    })

    await this.getRepository(User).save(user);
  }

  findAll() {
    return `This action returns all accounts`;
  }

  async findOne(id: string) {
    const existingAccount = await this.accountsRepo.findOneBy({ id });
    if (!existingAccount) throw new Error('Account not found');

    return existingAccount;
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: string) {
    return `This action removes a #${id} account`;
  }
}
