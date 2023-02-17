import {Module} from '@nestjs/common';
import {Service} from "@enums";
import {UserModule} from "../user/user.module";
import {NotificationService} from "./notification.service";

@Module({
	imports: [
		UserModule,
	],
	providers: [{
		provide: Service.Notification,
		useClass: NotificationService,
	}],
	exports: [Service.Notification],
})
export class NotificationModule {}
