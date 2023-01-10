import React from "react";
import { List, Datagrid, TextField, DateField, BooleanField } from 'react-admin';

export const EventList = () => {
	return (
		<List>
			<Datagrid>
				<TextField source="id" />
				<TextField source="master.name"/>
			</Datagrid>
		</List>
	);
};