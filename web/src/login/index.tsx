import React, {useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import PhoneInput from 'react-phone-number-input'

import {IEvent} from "../interfaces";

import 'react-phone-number-input/style.css'

interface ILoginModal {
	open: boolean
	onClose: () => void
	event?: IEvent
}

export const LoginModal = (props: ILoginModal) => {
	const {onClose, open, event} = props;
	const [phone, setPhone] = useState('');
	const [name, setName] = useState('');
	
	const handleSaveClick = async () => {
	
	};
	
	const handleNumberChange = (v: string) => {
		setPhone(v);
	};
	
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>test</DialogTitle>
			<DialogContent>
				<DialogContentText>asd</DialogContentText>
				<PhoneInput
					defaultCountry="UA"
					countries={['UA']}
					country="UA"
					value={phone}
					onChange={handleNumberChange}
					countryCallingCodeEditable={false}
					limitMaxLength={true}
				/>
			</DialogContent>
			<DialogActions>
				<Button color='secondary' onClick={onClose}>
					Відміна
				</Button>
				<Button variant='contained' color='success' onClick={handleSaveClick}>
					Зберегти
				</Button>
			</DialogActions>
		</Dialog>
	);
};