import HttpError from './HttpError';
import storage from './storage';
import {accessTokenLocalStorageKey} from '../constants';

export interface FetchOptions {
  headers?: Headers
  method: string
  body?: BodyInit
  user?: any // todo user dto create
}

export const fetchJson = (url: string, options: FetchOptions) => {
  const requestHeaders =
    options.headers ||
    new Headers({
      Accept: 'application/json',
    });

  if (!(options && options.body && options.body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }
  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set('Authorization', options.user.token);
  } else {
    const urlObj = new URL(url);

    const token = storage.load(accessTokenLocalStorageKey);

    if (token && token.id) {
      requestHeaders.set('Authorization', token.id);
      // urlObj.searchParams.append('access_token', token.id);
    }

    url = urlObj.toString();
  }

  return fetch(url, {...options, headers: requestHeaders})
    .then(async (response) => {

        // Workaround for safari browser. Safari destroys Authorization headers on redirected requests.
        // url: https://stackoverflow.com/questions/53488315/what-is-fetchs-redirect-and-authorization-headers-expected-behavior-safari-ha
        if ((response.status === 403 || response.status === 401) && response.redirected) {
          response = await fetch(response.url, {...options, headers: requestHeaders});
        }

        const responseText = await response.text();

        return ({
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          body: responseText,
        });
      }
    )
    .then(({status, statusText, headers, body}) => {
      let json;
      try {
        json = JSON.parse(body);
      } catch (e) {
        // not json, no big deal
      }
      if (status === 401) {
        storage.remove(accessTokenLocalStorageKey);

        // workaround for RA: skip multiple redirection to login form
        if (window.location.pathname === '/login') {
          return Promise.reject(new HttpError(statusText, status));
        }

        return Promise.reject('Unauthorized');
      } else if (status < 200 || status >= 300) {
        let message = statusText;

        if (json && json.error) {
          if (json.error.message) {
            message = json.error.message;

            if (Array.isArray(json.error.details) && json.error.details.length) {
              message += '\n';
              message += json.error.details.map((details: any) => details.message).join('\n');
            }
          } else if (json.error.messages && json.error.messages.length > 0) {
            message = json.error.messages[0];
          }
        }
        return Promise.reject(new HttpError(message, status));
      }
      return {status, headers, body, json};
    });
};

export const queryParameters = (data: any) =>
  Object.keys(data)
    .map((key) => [key, data[key]].map(encodeURIComponent).join('='))
    .join('&');
