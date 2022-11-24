import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const asd:string = "xd"
    return asd
  }
}
