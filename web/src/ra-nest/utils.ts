import {accessTokenLocalStorageKey, logoutReasonLocalStorageKey} from "../constants";
import storage from './storage';

interface Token {
  id: string,
  timestamp: number,
}

export const saveSessionLogoutReasonIfNeeded = (token: Token) => {
  const loadedToken = token || storage.loadWithTimestamp(accessTokenLocalStorageKey);

  if (loadedToken && loadedToken.timestamp && loadedToken.timestamp < Date.now()) {
    localStorage.setItem(logoutReasonLocalStorageKey, 'common.login.errors.session_expired');
  }
};
export const saveUnauthorizedLogoutReasonIfNeeded = () => {
  const token = storage.loadWithTimestamp(accessTokenLocalStorageKey);

  if (token.id) {
    localStorage.setItem(logoutReasonLocalStorageKey, 'common.login.errors.unauthorized_request');
  } else {
    saveSessionLogoutReasonIfNeeded(token);
  }
};