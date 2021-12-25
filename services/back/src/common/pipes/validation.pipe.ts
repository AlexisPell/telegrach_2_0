import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype as any, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints as any).join(
          ', ',
        )}`;
      });
      console.log(
        '🚀 ~ file: validation.pipe.ts ~ line 16 ~ ValidationPipe ~ messages ~ messages',
        messages,
      );
      throw new ValidationException(messages);
    }
    return value;
  }
}
