import React, {useState} from 'react';
import {usePermissions, useTranslate} from 'react-admin';
import {EventImpl} from '@fullcalendar/core/internal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {useTheme} from '@mui/material/styles';

import {userRoleAdmin, usersResource} from "../constants";

import classes from '../calendar/calendar.module.css';
import {EventStatusSelect} from "./EventStatusSelect";
import {SelectChangeEvent} from "@mui/material/Select";

interface IEventEditModal {
  open: boolean;
  onClose: () => void;
  event: EventImpl | null;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const EventEditModal = (props: IEventEditModal) => {
  const {open, onClose, event} = props;

  const translate = useTranslate();
  const {permissions} = usePermissions();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [status, setStatus] = useState(event?.extendedProps?.status as string || '');
  
  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const handleEventEdit = () => {};

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} TransitionComponent={Transition} keepMounted>
      <DialogTitle sx={{m: 0, p: 2}}>
        {translate('events.edit_event')}
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{translate('events.modal_edit_content_text')}</DialogContentText>
        {permissions.includes(userRoleAdmin) && (
          <div className={classes.adminCustomerInfo}>
            <div>
              <span>{translate('events.client')}</span>
              {' - '}
              <a href={`${usersResource}/${event?.extendedProps?.customerId}`} className={classes.link}>
                {event?.extendedProps?.customerName || ''}
              </a>
            </div>
            <div>
              <span>{translate('events.phone')}</span>
              {' - '}
              <a href={`tel:${event?.extendedProps?.phone}`} className={classes.link}>{event?.extendedProps?.phone}</a>
            </div>
            <EventStatusSelect value={status} onChange={handleChangeStatus}/>
            <span>Закончу попозже</span>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={onClose as () => {}} size='small'>
          {translate('events.buttons.close')}
        </Button>
        <Button variant='contained' color='success' onClick={handleEventEdit} size='small'>
          {translate('events.buttons.edit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
