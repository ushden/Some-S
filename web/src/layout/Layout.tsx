import React from 'react';
import {Layout, LayoutProps} from 'react-admin';
import {CustomAppBar} from './AppBar';
import {CustomMenu} from './Menu';

export const CustomLayout = ({children, ...props}: LayoutProps): JSX.Element => (
  <Layout
    {...props}
    appBar={CustomAppBar}
    menu={CustomMenu}
  >
    {children}
  </Layout>
);
