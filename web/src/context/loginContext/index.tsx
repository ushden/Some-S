import React from 'react';
import {toggleLoginModalType} from "../types";

type Action = {type: typeof toggleLoginModalType};
type Dispatch = (action: Action) => void;
type State = {showModal: boolean};
type LoginProviderProps = {children: React.ReactNode};

const LoginStateContext = React.createContext<{state: State; dispatch: Dispatch} | undefined>(undefined);

const loginReducer = (state: State, action: Action) => {
  switch (action.type) {
    case toggleLoginModalType: {
      return {showModal: !state.showModal};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const LoginProvider = ({children}: LoginProviderProps) => {
  const [state, dispatch] = React.useReducer(loginReducer, {showModal: false});
  const value = {state, dispatch};
  
  return <LoginStateContext.Provider value={value}>{children}</LoginStateContext.Provider>;
}

const useLoginContext = () => {
  const context = React.useContext(LoginStateContext);

  if (context === undefined) {
    throw new Error('Context for login not found');
  }

  return context;
}

export {LoginProvider, useLoginContext};
