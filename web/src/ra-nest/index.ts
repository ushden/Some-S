import {queryParameters, fetchJson} from "./fetch";
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
  FETCH,
  FETCH_GET,
  FETCH_STREAM,
} from "./types";
import {config} from './config';

export * from './authClient';

export default (apiUrl = config.api(), httpClient = fetchJson) => {
  const convertRESTRequestToHTTP = (type: string, resource: string, params: any) => {
    let url = '';
    const options = {
      method: '',
      body: '',
    };

    switch (type) {
      case GET_LIST: {
        const query: any = {
          where: {...params.filter},
          attributes: params.attributes && [...params.attributes],
          limit: params.limit,
          skip: params.skip,
        };


        if (params.pagination) {
          const {page, perPage} = params.pagination;
          if (perPage > 0) {
            query.limit = perPage;
            if (page >= 0) {
              query.skip = (page - 1) * perPage;
            }
          }
        }

        if (params.sort) {
          const {field, order} = params.sort;
          if (field) query.order = [`${field} ${order}`];
        }

        if (typeof params.include === 'string') {
          query.include = params.include;
        } else if (Array.isArray(params.include)) {
          query.include = params.include;
        } else if (params.include) {
          query.include = {...params.include};
        }

        url = `${apiUrl}/${resource}?${queryParameters({
          filter: JSON.stringify(query),
        })}`;
        break;
      }
      case GET_ONE:
        let include;
        if (typeof params.include === 'string') {
          include = params.include;
        } else if (Array.isArray(params.include)) {
          include = params.include;
        } else if (params.include) {
          include = {...params.include};
        }
        url = `${apiUrl}/${resource}/${params.id}?${queryParameters({
          filter: JSON.stringify({include: include, fields: params.fields}),
        })}`;
        break;
      case GET_MANY: {
        const idsField = params.idsField || 'id';
        const query: any = {
          fields: params.fields && [...params.fields],
        };

        if (params.ids.length > 0) {
          query.where = {[idsField]: {inq: params.ids}};
        } else {
          query.where = {};
        }

        if (typeof params.include === 'string' || Array.isArray(params.include)) {
          query.include = params.include;
        } else if (params.include) {
          query.include = {...params.include};
        }

        url = `${apiUrl}/${resource}?${queryParameters({
          filter: JSON.stringify(query),
        })}`;
        break;
      }
      case GET_MANY_REFERENCE: {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query: any = {
          where: {
            ...params.filter,
            [params.target]: params.id,
          },
          fields: params.fields && [...params.fields],
        };

        if (field) query.order = [`${field} ${order}`];
        if (perPage > 0) {
          query.limit = perPage;
          if (page >= 0) {
            query.skip = (page - 1) * perPage;
          }
        }
        url = `${apiUrl}/${resource}?${queryParameters({
          filter: JSON.stringify(query),
        })}`;
        break;
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'PATCH';
        options.body = JSON.stringify(params.data);
        break;
      case CREATE:
        url = `${apiUrl}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      case FETCH_STREAM:
      case FETCH:
        url = `${apiUrl}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params);
        break;
      case FETCH_GET:
        const urlObj = new URL(`${apiUrl}/${resource}`);

        Object.keys(params).forEach((key) => {
          urlObj.searchParams.append(
            key,
            typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]
          );
        });

        url = urlObj.toString();
        options.method = 'GET';
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
      case DELETE_MANY:
        const baseUrl = new URL(`${apiUrl}/${resource}`);
        baseUrl.searchParams.append('where', JSON.stringify({id: {inq: params.ids}}));

        url = baseUrl.toString();
        options.method = 'DELETE';
        break;
      default:
        throw new Error(`Unsupported fetch action type!!! ${type}`);
    }
    return {url, options};
  };

  const convertHTTPResponseToREST = (response: any, type: string, resource: string, params: any) => {
    const {headers, json, body} = response;

    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        return {
          data: json,
        };
      case CREATE:
        return {data: {...params.data, id: json.id}};
      case FETCH:
        return {data: json};
      case FETCH_GET:
        return {data: json};
      case FETCH_STREAM:
        return {data: {body}};
      case DELETE:
        return {data: {...params.data, id: params.id}};
      case DELETE_MANY:
        return {data: params.ids};
      default:
        return {data: json};
    }
  };

  return (type: string, resource: string, params: any) => { // todo params interface
    if (type === UPDATE_MANY) {
      return Promise.all(
        params.ids.map((id: string | number) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
          })
        )
      ).then((responses) => ({
        data: responses.map((response) => response.json),
      }));
    }

    if (type === DELETE_MANY) {
      return Promise.all(
        params.ids.map((id: string | number) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: 'DELETE',
          })
        )
      ).then((responses) => ({
        data: responses.map((response) => response.json),
      }));
    }

    const {url, options} = convertRESTRequestToHTTP(type, resource, params);
    return httpClient(url, options)
      .then((response) => convertHTTPResponseToREST(response, type, resource, params))
      .catch((err) => {
        return Promise.reject(err);
      });
  };
}
;
