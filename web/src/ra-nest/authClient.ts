import {AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS} from 'react-admin';
import {
  accessTokenLocalStorageKey,
  redirectAfterLoginLocalStorageKey,
} from '../constants';
import storage from './storage';
import {config} from "./config";
import {saveSessionLogoutReasonIfNeeded} from './utils';

export const authClient = () => {
  let accessTokenData = {};
  const apiUrl = config.api();
  const loginApiUrl = `${apiUrl}/users/login`
  const logoutApiUrl = `${apiUrl}/users/logout`

  return async (type: string, params: any) => {
    if (type === AUTH_LOGIN) {
      const request = new Request(loginApiUrl, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: new Headers({'Content-Type': 'application/json'}),
      });
      const response = await fetch(request)

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      const {ttl, ...data} = await response.json();
      const {email} = params;
      storage.save(accessTokenLocalStorageKey, {...data, email}, ttl);
      accessTokenData = data;
    }

    if (type === AUTH_LOGOUT) {
      const token = storage.load(accessTokenLocalStorageKey);

      localStorage.setItem(redirectAfterLoginLocalStorageKey, window.location.pathname);

      if (!token) {
        return Promise.resolve();
      }

      const request = new Request(logoutApiUrl, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': token.id,
        }),
      });

      storage.remove(accessTokenLocalStorageKey);

      await fetch(request);

      return Promise.resolve();
    }

    if (type === AUTH_ERROR) {
      const status = params.message.status;
      if (status === 401 || status === 403) {
        storage.remove(accessTokenLocalStorageKey);

        return Promise.reject();
      }

      return Promise.resolve();
    }

    if (type === AUTH_CHECK) {
      const token = storage.loadWithTimestamp(accessTokenLocalStorageKey);

      if (token && token.id) {
        return Promise.resolve();
      } else {
        saveSessionLogoutReasonIfNeeded(token);

        storage.remove(accessTokenLocalStorageKey);

        return Promise.resolve();
      }
    }

    if (type === AUTH_GET_PERMISSIONS) {
      const token = storage.loadWithTimestamp(accessTokenLocalStorageKey);

      if (token && token.highestRole) {
        return Promise.resolve({
          role: token.highestRole,
          token,
        });
      } else {
        saveSessionLogoutReasonIfNeeded(token);

        storage.remove(accessTokenLocalStorageKey);

        return Promise.resolve({
          role: ''
        });
      }
    }

    return Promise.reject('Unknown method');
  };
};
