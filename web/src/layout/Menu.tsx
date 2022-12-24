import React from 'react';
import {Menu, MenuProps} from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PeopleIcon from '@mui/icons-material/People';
import LabelIcon from '@mui/icons-material/Label';

export const CustomMenu = (props: MenuProps): JSX.Element => (
  <Menu {...props}>
    <Menu.Item to="/" primaryText="Test 123" leftIcon={<BookIcon/>}/>
    <Menu.Item to="/posts" primaryText="Test 1" leftIcon={<BookIcon/>}/>
    <Menu.Item to="/comments" primaryText="Test 2" leftIcon={<ChatBubbleIcon/>}/>
    <Menu.Item to="/users" primaryText="Test 3" leftIcon={<PeopleIcon/>}/>
    <Menu.Item to="/custom-route" primaryText="Test 4" leftIcon={<LabelIcon/>}/>
  </Menu>
);