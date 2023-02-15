import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class PhoneTransform implements PipeTransform<string, string> {
	transform(value: string, metadata: ArgumentMetadata): string {
		if (!value) {
			throw new BadRequestException('Phone required');
		}
		
		if (value.length === 10) {
			value = `+380${value}`;
		}
		
		if (value.length === 13 && value.startsWith('380')) {
			value = `+${value}`;
		}
		
		return value;
	}
}