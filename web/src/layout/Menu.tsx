import React from 'react';
import {Menu, MenuProps} from 'react-admin';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EventIcon from '@mui/icons-material/Event';

import classes from './layout.module.css';

export const CustomMenu = (props: MenuProps): JSX.Element => (
  <Menu {...props} className={classes.menu}>
    <Menu.Item to="/" primaryText="Календар" leftIcon={<CalendarMonthOutlinedIcon/>}/>
    <Menu.Item to="/events" primaryText="Записи" leftIcon={<EventIcon/>}/>
  </Menu>
);