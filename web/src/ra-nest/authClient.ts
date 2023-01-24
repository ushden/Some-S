import {HttpError} from 'react-admin';
import {
  accessTokenLocalStorageKey,
} from '../constants';
import storage from './storage';
import {config} from "./config";

export const authProvider = {
  login: async (params: {name: string, phone: string}) =>  {
    const request = new Request(`${config.api()}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const response = await fetch(request);
  
    if (response.status < 200 || response.status >= 300) {
      console.error(response.text());
      
      throw new Error(response.statusText);
    }
  
    const {ttl, ...data} = await response.json();
    storage.save(accessTokenLocalStorageKey, data, ttl);
    
    return data;
  },
  checkError: (error: HttpError) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      storage.remove(accessTokenLocalStorageKey);
      
      return Promise.reject();
    }
    
    return Promise.resolve();
  },
  getPermissions: () => {
    const token = storage.loadWithTimestamp(accessTokenLocalStorageKey);
    
    return Promise.resolve(token ? token.roles : []);
  },
  checkAuth: () => Promise.resolve(),
  logout: () => {
    storage.remove(accessTokenLocalStorageKey);
    
    return Promise.resolve('/');
  },
  getIdentity: () => {
    try {
      const token = storage.load(accessTokenLocalStorageKey);
      
      return Promise.resolve(token || {});
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
