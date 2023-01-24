import React from "react";
import { List, Datagrid, TextField, DateField, BooleanField } from 'react-admin';
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";

export const EventList = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	
	return (
		<List>
			<Datagrid>
				<TextField source="id" />
				<TextField source="master.name"/>
			</Datagrid>
		</List>
	);
};