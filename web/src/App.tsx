import React from 'react';
import {Admin, Resource} from 'react-admin';
import restClient, {authClient} from "./ra-nest";
import {Layout} from './layout';

import './App.css';

const authProvider = authClient();
const dataProvider = restClient();

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={Layout}
    >
      <Resource name="hello"/>
    </Admin>
  );
}

export default App;
