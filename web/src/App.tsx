import React from 'react';
import {Admin, LegacyDataProvider, Resource} from 'react-admin';
import {createBrowserHistory} from 'history';

import restClient, {authClient} from "./ra-nest";
import {Layout} from './layout';
import {Dashboard} from "./dashboard";
import {i18nProvider} from "./i18n";
import dataProviderDecorator from "./dataProviderDecorator";
import {eventsResource} from "./constants";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const authProvider = authClient();
const dataProvider = restClient();
const decoratedDataProvider = dataProviderDecorator(dataProvider);
const history = createBrowserHistory();

function App() {
  return (
    <Admin
      dashboard={Dashboard}
      dataProvider={decoratedDataProvider as LegacyDataProvider}
      authProvider={authProvider}
      layout={Layout}
      history={history}
      i18nProvider={i18nProvider}
    >
      <Resource name={eventsResource}/>
    </Admin>
  );
}

export default App;
