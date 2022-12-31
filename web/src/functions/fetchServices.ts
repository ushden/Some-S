import { LegacyDataProvider } from "react-admin";
import { GET_LIST } from "../ra-nest/types";
import { servicesResource } from "../constants";
import { get } from "lodash";

export const fetchServices = async (dataProvider: LegacyDataProvider) => {
  try {
    const response = await dataProvider(GET_LIST, servicesResource, {});

    return get(response, "data.rows", []);
  } catch (e) {
    console.error(e);
  }
};
