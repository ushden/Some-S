import React from 'react';
import {Layout, LayoutProps} from 'react-admin';
import {CustomAppBar} from './AppBar';
import {CustomMenu} from './Menu';
import {LoginModal} from '../login';
import {useLoginContext} from "../context/loginContext";
import {toggleLoginModalType} from "../context/types";

export const CustomLayout = ({children, ...props}: LayoutProps): JSX.Element => {
  const {state, dispatch} = useLoginContext();
  
  const handleToggleLoginModal = () => {
    dispatch({type: toggleLoginModalType});
  };
  
  return (
    <Layout {...props} appBar={CustomAppBar} menu={CustomMenu}>
      {children}
      <LoginModal open={state.showModal} onClose={handleToggleLoginModal}/>
    </Layout>
  );
};
