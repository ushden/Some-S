import {Module} from "@nestjs/common";
import {TelegrafModule} from "nestjs-telegraf";

import {TelegramUpdate} from "./telegram.update";
import {UserModule} from "../user/user.module";
import {sessionMiddleware} from "../common/middlewares/telegram/session.middleware";
import {TelegramService} from "./telegram.service";
import {Service} from "@enums";
import {EventModule} from "../event/event.module";

@Module({
	imports: [
		TelegrafModule.forRootAsync({
			useFactory: () => ({
				token: process.env.TELEGRAM_KEY,
				botName: process.env.TELEGRAM_BOT_NAME,
				middlewares: [sessionMiddleware],
			}),
		}),
		UserModule,
		EventModule,
	],
	providers: [TelegramUpdate, {provide: Service.Telegram, useClass: TelegramService}],
})
export class TelegramModule {}
