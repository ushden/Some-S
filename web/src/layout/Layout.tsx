import React from 'react';
import {Layout, LayoutProps, Sidebar, SidebarProps} from 'react-admin';
import {CustomAppBar} from './AppBar';
import {CustomMenu} from './Menu';

import classes from './layout.module.css';

const CustomSidebar = (props: SidebarProps): JSX.Element => <Sidebar {...props} className={classes.sidebar}>{props.children}</Sidebar>;
export const CustomLayout = ({children, ...props}: LayoutProps): JSX.Element => (
  <Layout
    {...props}
    appBar={CustomAppBar}
    menu={CustomMenu}
  >
    {children}
  </Layout>
);
