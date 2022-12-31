import {applyDecorators} from "@nestjs/common";

export const FindAndCountAll = <T>(): MethodDecorator & ClassDecorator => {
  return applyDecorators(

  );
};