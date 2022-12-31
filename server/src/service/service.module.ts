import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service as EnumService } from '@enums';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './entities/service.entity';

@Module({
  imports: [SequelizeModule.forFeature([Service])],
  controllers: [ServiceController],
  providers: [
    {
      provide: EnumService.Services,
      useClass: ServiceService,
    },
  ],
  exports: [EnumService.Services],
})
export class ServiceModule {}
