import React from 'react';

import {LoginProvider} from './loginContext';
import {EventProvider} from './eventContext';


interface ContextProps {
	children: React.ReactNode;
}
export const Context = ({children}: ContextProps) => {
	return (
		<LoginProvider>
			<EventProvider>
				{children}
			</EventProvider>
		</LoginProvider>
	);
};
