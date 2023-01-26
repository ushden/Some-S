import React from 'react';
import {Layout, LayoutProps} from 'react-admin';
import {CustomAppBar} from './AppBar';
import {CustomMenu} from './Menu';
import {LoginModal} from '../login';
import {useLoginDispatch, useLoginState} from "../context/loginContext";
import {toggleLoginModalAction} from "../context/actions";

export const CustomLayout = ({children, ...props}: LayoutProps): JSX.Element => {
  const updateLoginState = useLoginDispatch();
  const state = useLoginState();
  
  const handleToggleLoginModal = () => {
    updateLoginState(toggleLoginModalAction());
  };
  
  return (
    <Layout {...props} appBar={CustomAppBar} menu={CustomMenu}>
      {children}
      <LoginModal open={state.showModal} onClose={handleToggleLoginModal}/>
    </Layout>
  );
};
