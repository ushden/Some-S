import React, {ChangeEvent, useState} from 'react';
import {LegacyDataProvider, useLogin, useNotify, useTranslate} from 'react-admin';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import {createEvent} from '../functions';
import {standardPhoneLength} from '../constants';
import {useEventDispatch, useEventState} from '../context/eventContext';
import {setEventAction} from '../context/actions';
import {checkIfUserExist} from "../functions/checkIfUserExist";
import {useCustomDataProvider} from "../hooks/useDataProvider";

interface ILoginModal {
  open: boolean;
  onClose: () => void;
}

export const LoginModal = (props: ILoginModal) => {
  const {onClose, open} = props;
  const state = useEventState();
  const {event} = state;

  const translate = useTranslate();
  const login = useLogin();
  const notify = useNotify();
  const dataProvider = useCustomDataProvider();
  const updateEventState = useEventDispatch();

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [needRegistration, setNeedRegistration] = useState(false);

  const handleSaveClick = async () => {
    if (!name && needRegistration) {
      notify('users.errors.name', {type: 'warning'});

      return;
    }

    if (!phone) {
      notify('users.errors.phone', {type: 'warning'});

      return;
    }

    if (phone.length !== standardPhoneLength) {
      notify('users.errors.invalid_phone', {type: 'warning'});

      return;
    }

    try {
      let isExist = false;
      
      if (!needRegistration) {
        isExist = await checkIfUserExist(dataProvider, phone);
      }
      
      if (!isExist && !needRegistration) {
        setNeedRegistration(true);
        
        return;
      }
      
      const response = await login({name, phone});

      if (event) {
        await createEvent(
          dataProvider,
          {...event, customerId: response.userId},
          notify,
          updateEventState,
        );

        updateEventState(setEventAction(null));
      }

      window.location.reload();
    } catch (e) {
      // @ts-ignore
      notify(e.message, {type: 'error'});
    }
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPhone(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{translate('users.login.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {needRegistration ? translate('users.login.registration_content') : translate('users.login.content')}
        </DialogContentText>
        <FormControl variant='outlined' sx={{width: '100%'}}>
          <TextField
            label={translate('users.fields.phone')}
            value={phone}
            onChange={handleNumberChange}
            InputProps={{
              startAdornment: <InputAdornment position='start'>+38</InputAdornment>,
            }}
            type='number'
            variant='outlined'
            required
            sx={{width: '100%'}}
          />
          {needRegistration && (
            <TextField
              label={translate('users.fields.name')}
              variant='outlined'
              value={name}
              onChange={handleNameChange}
              required
              sx={{mb: '1rem', width: '100%'}}
            />
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={onClose} size='small'>
          {translate('users.login.cancel')}
        </Button>
        <Button variant='contained' color='success' onClick={handleSaveClick} size='small'>
          {translate('users.login.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
