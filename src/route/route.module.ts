import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Route } from './entities';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Route, Company])
  ,
  ],
  controllers: [RouteController],
  providers: [RouteService, CompanyService, UserService]
})
export class RouteModule {}
