import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {LegacyDataProvider, Translate, useNotify, usePermissions, useTranslate} from 'react-admin';
import dayjs, {Dayjs} from 'dayjs';
import {EventInput} from '@fullcalendar/core';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Skeleton from '@mui/material/Skeleton';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TransitionProps} from '@mui/material/transitions';
import {Theme, useTheme} from '@mui/material/styles';
import {DateTime} from 'luxon';

import {getTimeSlots, parseCombinedValue, validateEvent} from '../utils';
import {createEvent, fetchMaters, fetchServices} from '../functions';
import {IEvent, IService} from '../interfaces';
import {eventStatusWaiting, userRoleAdmin, userRoleMaster} from '../constants';
import {setEventAction, toggleLoginModalAction} from '../context/actions';
import {useLoginDispatch} from '../context/loginContext';

import classes from '../calendar/calendar.module.css';
import {useCurrentUser} from '../hooks/useCurrentUser';
import {useEventDispatch} from '../context/eventContext';
import InputAdornment from '@mui/material/InputAdornment';
import {createCustomer} from '../functions/createCustomer';
import {useCustomDataProvider} from '../hooks/useDataProvider';
import {checkIfUserExist} from '../functions/checkIfUserExist';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ServicesChooseProps {
  services: Array<IService>;
  loading: boolean;
  service: Array<string>;
  onChange: (event: SelectChangeEvent<string[]>) => void;
  theme: Theme;
}

interface IEventModal {
  open: boolean;
  onClose: () => void;
  pickedDate?: string;
  events: EventInput[];
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const getStyles = (name: string, service: readonly string[], theme: Theme) => {
  return {
    fontWeight: service.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
};

const renderMasterSelect = ({
  loading = false,
  masters = [],
  master = '',
  onChange = (event: SelectChangeEvent) => {},
}) => {
  if (loading || !masters.length) {
    return (
      <Box className={classes.input}>
        <Skeleton variant='rectangular' width='100%' height={48} />
      </Box>
    );
  }

  return (
    <FormControl fullWidth margin='dense'>
      <InputLabel id='masters-label'>Майстри</InputLabel>
      <Select labelId='masters-label' id='masters-select' value={master} onChange={onChange}>
        {masters.map(({id, name}) => (
          <MenuItem value={id} key={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Виберіть майстра</FormHelperText>
    </FormControl>
  );
};

const renderServices = ({services = [], loading = false, service, onChange, theme}: ServicesChooseProps) => {
  if (!services.length || loading) {
    return (
      <Box className={classes.input}>
        <Skeleton variant='rectangular' width='100%' height={48} />
      </Box>
    );
  }

  return (
    <FormControl fullWidth margin='dense'>
      <InputLabel id='services-label'>Послуги</InputLabel>
      <Select
        labelId='services-label'
        id='multiple-services'
        label='Послуги'
        multiple
        value={service}
        onChange={onChange}
        input={<OutlinedInput id='multiple-services' className={classes.serviceInput} />}
        renderValue={(selected: string[]) => (
          <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
            {selected.map(value => {
              const [id, name] = parseCombinedValue(value);
              return (
                <Chip
                  key={id}
                  label={name}
                  sx={{
                    backgroundColor: '#94C14E',
                    color: '#fff',
                  }}
                />
              );
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {services.map(({id, name, price, leadTime}) => (
          <MenuItem
            key={id}
            value={`${id}&${name}&${price}&${leadTime}`}
            style={getStyles(name, service, theme)}
            className={classes.serviceMenuItem}
          >
            {`${name} - ${price} грн`}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Виберіть що саме вам потрібно</FormHelperText>
    </FormControl>
  );
};

const renderAvailableTimes = (
  timeSlots: {display: string; start: number; end: number}[],
  time: number | null,
  onChange: (t: number) => void,
  chosenServices: Array<string>,
  master: string,
  translate: Translate,
) => {
  if (!timeSlots.length && (!chosenServices || !chosenServices.length) && !time && !master) {
    return null;
  }

  if (chosenServices && chosenServices.length && time && master && !timeSlots.length) {
    return <p>{translate('events.not_available_time')}</p>;
  }

  return (
    <ToggleButtonGroup value={time} exclusive className={classes.times}>
      {timeSlots.map(({display, start}) => (
        <ToggleButton
          size='small'
          sx={{m: '5px'}}
          className={classes.time}
          key={start}
          value={start}
          onClick={() => onChange(start)}
        >
          {display}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export const EventModal = ({open, onClose, events}: IEventModal) => {
  const dataProvider = useCustomDataProvider();
  const notify = useNotify();
  const translate = useTranslate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {permissions} = usePermissions();
  const currentUser = useCurrentUser();
  const updateLoginState = useLoginDispatch();
  const updateEventState = useEventDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [masters, setMasters] = useState([]);
  const [master, setMaster] = useState('');
  const [services, setServices] = useState<Array<IService>>([]);
  const [chosenServices, setChosenServices] = useState<string[]>([]);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [time, setTime] = useState<number | null>(null);
  const [timeSlots, setTimeSlots] = useState<{display: string; start: number; end: number}[]>([]);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const {totalPrice, totalLeadTime} = useMemo(() => {
    return chosenServices.reduce(
      (acc, value) => {
        const [, , price, leadTime] = parseCombinedValue(value);

        acc['totalPrice'] += Number(price);
        acc['totalLeadTime'] += Number(leadTime);

        return acc;
      },
      {totalPrice: 0, totalLeadTime: 0},
    );
  }, [chosenServices]);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const masters = await fetchMaters(dataProvider);
      const services = await fetchServices(dataProvider);

      setMasters(masters);
      setServices(services);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (master && date && totalLeadTime) {
      setTimeSlots(getTimeSlots(date, events, master, totalLeadTime));
    }
  }, [master, events, date, totalLeadTime]);

  const handleEventCreate = async () => {
    const services = chosenServices.map(s => {
      const [id, name, price, leadTime] = parseCombinedValue(s);

      return {
        id: +id,
        name,
        price: +price,
        leadTime: +leadTime,
      };
    });
    const error = validateEvent(
      {
        time,
        master,
        services: chosenServices,
        date,
        phone,
        name,
        permissions,
        isNewCustomer,
      },
      translate,
    );

    if (error) {
      setError(error);

      return;
    }

    const data: IEvent = {
      masterId: Number(master),
      services,
      created: date.valueOf(),
      start: time as number,
      end: DateTime.fromMillis(time as number)
        .plus({minutes: totalLeadTime})
        .valueOf(),
      status: eventStatusWaiting,
      customerId: currentUser?.userId,
      price: totalPrice,
      leadTime: totalLeadTime,
    };

    if (!permissions.length || !currentUser) {
      updateEventState(setEventAction(data));
      updateLoginState(toggleLoginModalAction());
      onClose();

      return;
    }

    const isExist = await checkIfUserExist(dataProvider, phone);

    if (Array.isArray(permissions) && permissions.includes(userRoleAdmin) && !isExist) {
      setError(translate('events.errors.user_not_exist'));

      return;
    }

    if (Array.isArray(permissions) && permissions.includes(userRoleAdmin)) {
      const customer = await createCustomer(name, phone, dataProvider);
      
      data.customerId = +customer.id;
    }

    try {
      await createEvent(dataProvider, data, notify, updateEventState);

      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleMasterChange = useCallback((event: SelectChangeEvent) => {
    setMaster(event.target.value);

    if (error) {
      setError('');
    }

    if (time) {
      setTime(null);
    }
  }, []);

  const handleChosenServices = useCallback((event: SelectChangeEvent<typeof chosenServices>) => {
    const {
      target: {value},
    } = event;
    setChosenServices(typeof value === 'string' ? value.split(',') : value);

    if (error) {
      setError('');
    }

    if (time) {
      setTime(null);
    }
  }, []);

  const handleDateChange = useCallback((v: any) => {
    setDate(v);

    if (error) {
      setError('');
    }

    if (time) {
      setTime(null);
    }
  }, []);

  const handleTimeChange = useCallback((t: number) => {
    setTime(t);

    if (error) {
      setError('');
    }
  }, []);

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPhone(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (error) {
      setError('');
    }

    setName(event.target.value);
  };

  const handleIsNewCustomer = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setIsNewCustomer(checked);
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} TransitionComponent={Transition} keepMounted>
      <DialogTitle sx={{m: 0, p: 2}}>
        {translate('events.create_event')}
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
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          {permissions.includes(userRoleAdmin) || permissions.includes(userRoleMaster)
            ? translate('events.modal_admin_create_content_text')
            : translate('events.modal_create_content_text')}
        </DialogContentText>
        {(permissions.includes(userRoleAdmin) || permissions.includes(userRoleMaster)) && (
          <Box>
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
              {isNewCustomer && (
                <TextField
                  label={translate('users.fields.name')}
                  variant='outlined'
                  value={name}
                  onChange={handleNameChange}
                  required
                  sx={{mb: '1rem', width: '100%'}}
                />
              )}
              <FormControlLabel
                control={<Checkbox value={isNewCustomer} onChange={handleIsNewCustomer} />}
                label='Це новий клієнт'
              />
            </FormControl>
          </Box>
        )}
        <DatePicker
          disablePast
          label='Дата запису'
          openTo='day'
          views={['day']}
          value={date}
          onChange={handleDateChange}
          minDate={dayjs()}
          renderInput={params => <TextField {...params} fullWidth margin='dense' />}
        />
        {renderMasterSelect({
          loading,
          masters,
          master,
          onChange: handleMasterChange,
        })}
        {renderServices({
          loading,
          services,
          theme,
          service: chosenServices,
          onChange: handleChosenServices,
        })}
        {renderAvailableTimes(timeSlots, time, handleTimeChange, chosenServices, master, translate)}
        <p className={classes.totalPrice}>
          Загальна вартість: {totalPrice} грн. <br /> Потрібно часу: {totalLeadTime} хв.
        </p>
        {error && <p>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={onClose as () => {}} size='small'>
          {translate('events.buttons.close')}
        </Button>
        <Button variant='contained' color='success' onClick={handleEventCreate} size='small'>
          {translate('events.buttons.create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
