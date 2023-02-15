import {LegacyDataProvider, useDataProvider} from "react-admin";

export const useCustomDataProvider = () => {
	const dataProvider = useDataProvider();
	
	return (dataProvider as unknown) as LegacyDataProvider;
};