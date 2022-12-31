import {LegacyDataProvider} from "react-admin";
import {eventsResource} from "./constants";
import {IQueryParams} from "./ra-nest";

const addIncludes = (requestHandler: LegacyDataProvider) => (type: string, resource: string, params: IQueryParams) => {
  const copyParams = {...params};

  copyParams.include = copyParams.include || [];

  if (resource === eventsResource && Array.isArray(copyParams.include)) {
    copyParams.include.push('customer', 'master')
  }

  return requestHandler(type, resource, copyParams);
};

const dataProviderDecorator = (dataProvider: LegacyDataProvider) => {
  return addIncludes(dataProvider);
};

export default dataProviderDecorator;