import {GET_LIST} from "../ra-nest/types";
import {getMastersEndpoint, usersResource} from "../constants";
import {get} from "lodash";
import {LegacyDataProvider} from "react-admin";

export const fetchMaters = async (dataProvider: LegacyDataProvider) => {
  try {
    const res = await dataProvider(GET_LIST, `${usersResource}/${getMastersEndpoint}`, {});
    console.log(res, 'response masters')

    return get(res, 'data', [])
  } catch (e) {
    console.error(e);
  }
};