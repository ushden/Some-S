import React from 'react';
import {AppBar, AppBarProps} from 'react-admin';

import classes from './layout.module.css';

export const CustomAppBar = (props: AppBarProps) => {
  return <AppBar
    {...props}
    className={classes.appBar}
    title="test"
  />
};
