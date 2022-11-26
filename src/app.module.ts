import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME }from './config/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { CompanyModule } from './company/company.module';
import { ItemModule } from './item/item.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { SaleModule } from './sale/sale.module';
import { BillModule } from './bill/bill.module';
import { RouteModule } from './route/route.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';

@Module({  
  imports: [
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>(DATABASE_HOST),
        port: parseInt(config.get<string>(DATABASE_PORT), 10),
        username: config.get<string>(DATABASE_USERNAME),
        password: config.get<string>(DATABASE_PASSWORD),
        database: config.get<string>(DATABASE_NAME),
        entities: [__dirname+ './**/**/*entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'file',
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    AccessControlModule.forRoles(roles),
    AuthModule, ClientModule, CompanyModule, ItemModule, InventoryModule, OrderModule, SaleModule, BillModule, RouteModule, UserModule],
    controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
