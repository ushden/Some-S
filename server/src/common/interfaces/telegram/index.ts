import {Context} from "telegraf";

interface ITelegrafContext extends Context {
	callback_query: {
		data: string;
	}
}

export {
	ITelegrafContext,
}