import React, {useReducer} from 'react';
import {createContainer} from 'react-tracked';
import {toggleLoginModalType} from "../types";

type Action = {type: typeof toggleLoginModalType};
type State = {showModal: boolean};

const initialState: State = {
  showModal: false,
};

const loginReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case toggleLoginModalType: {
      return {
        ...state,
        showModal: !state.showModal
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const useValue = () => useReducer(loginReducer, initialState);

export const {
  Provider: LoginProvider,
  useTrackedState: useLoginState,
  useUpdate: useLoginDispatch,
} = createContainer(useValue);
