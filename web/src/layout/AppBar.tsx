import React, {useCallback} from 'react';
import {AppBar, AppBarProps, useLogout} from 'react-admin';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import {useCurrentUser} from '../hooks/useCurrentUser';
import {useLoginDispatch} from '../context/loginContext';
import {toggleLoginModalAction} from '../context/actions';

import classes from './layout.module.css';

const CustomUserMenu = (): JSX.Element => {
  const currentUser = useCurrentUser();
  const updateLoginState = useLoginDispatch();
  const logout = useLogout();

  const handleClickLogin = useCallback(() => {
    updateLoginState(toggleLoginModalAction());
  }, []);

  const handleLogoutClick = useCallback(async () => {
    await logout();
  }, []);

  return currentUser && currentUser.id ? (
    <IconButton onClick={handleLogoutClick} sx={{color: '#fff'}}>
      <LogoutIcon />
    </IconButton>
  ) : (
    <IconButton onClick={handleClickLogin} sx={{color: '#fff'}}>
      <LoginIcon />
    </IconButton>
  );
};

export const CustomAppBar = (props: AppBarProps) => {
  return (
    <AppBar {...props} className={classes.appBar} userMenu={<CustomUserMenu />}>
      <span>Mirabell Nails</span>
      <span className={classes.spacer} />
    </AppBar>
  );
};
