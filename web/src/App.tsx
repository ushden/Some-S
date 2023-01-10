import React from 'react';
import {Admin, LegacyDataProvider, Resource} from 'react-admin';
import {createBrowserHistory} from 'history';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers';
import 'dayjs/locale/uk';

import restClient, {authClient} from './ra-nest';
import {Layout} from './layout';
import {Dashboard} from './dashboard';
import {theme} from "./layout/theme";
import {i18nProvider} from './i18n';
import dataProviderDecorator from './dataProviderDecorator';
import events from './calendar/event/index';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const authProvider = authClient();
const dataProvider = restClient();
const decoratedDataProvider = dataProviderDecorator(dataProvider);
const history = createBrowserHistory();

function App() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      locale='uk'
      adapterLocale='uk'
    >
      <Admin
        dashboard={Dashboard}
        theme={theme}
        dataProvider={decoratedDataProvider as LegacyDataProvider}
        authProvider={authProvider}
        layout={Layout}
        history={history}
        i18nProvider={i18nProvider}
      >
        <Resource {...events}/>
      </Admin>
    </LocalizationProvider>
  );
}

export default App;
