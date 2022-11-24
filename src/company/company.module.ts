import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities';
import { Client } from 'src/client/entities/client.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Company, Client])
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}
