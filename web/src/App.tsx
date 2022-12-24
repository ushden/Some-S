import React from 'react';
import {Admin, Resource} from 'react-admin';
import {createBrowserHistory} from 'history';

import restClient, {authClient} from "./ra-nest";
import {Layout} from './layout';
import {Dashboard} from "./dashboard";
import {i18nProvider} from "./i18n";

import './App.css';

const authProvider = authClient();
const dataProvider = restClient();
const history = createBrowserHistory();

function App() {
  return (
    <Admin
      dashboard={Dashboard}
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={Layout}
      history={history}
      i18nProvider={i18nProvider}
    >
      <Resource name="/"/>
    </Admin>
  );
}

export default App;
