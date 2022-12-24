import polyglotI18nProvider from 'ra-i18n-polyglot';
import {ua} from "./ua";

export const i18nProvider = polyglotI18nProvider(() => ua, 'ua');