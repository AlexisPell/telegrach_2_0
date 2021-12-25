import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  messages;
  constructor(response: any) {
    console.log(
      '🚀 ~ file: validation.exception.ts ~ line 6 ~ ValidationException ~ constructor ~ response',
      response,
    );
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
