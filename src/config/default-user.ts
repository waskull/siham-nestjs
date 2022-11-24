// import { Repository } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
// import { DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } from '../config/constants';
// import { User } from '../user/entities/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { config } from 'process';

// export class createResource {
//   @InjectRepository(User)
//   private readonly userRepository: Repository<User>
//   private readonly config: ConfigService
//   async createUser() {
//     const user = await this.userRepository.createQueryBuilder().where('email = :email', { email: config.get<string>('DEFAULT_USER_EMAIL') }).getOne();
//     if (!user) {
//       const adminUser = this.userRepository.create({
//         email: this.config.get<string>(DEFAULT_USER_EMAIL),
//         password: this.config.get<string>(DEFAULT_USER_PASSWORD),
//         firstname: 'Martin',
//         lastname: 'Castillo',
//         roles: ['admin'],
//         age: 20,
//         cedula: "000000123",
//         phone: "0000000123"
//       });

//       return await this.userRepository.save(adminUser);
//     }
//   }
// }