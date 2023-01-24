import React, {Fragment, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDataProvider, useGetIdentity, useTranslate} from 'react-admin';
import {WithPermissionsChildrenParams} from 'ra-core/src/auth/WithPermissions';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import luxon2Plugin from '@fullcalendar/luxon2';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import {DateSelectArg, EventClickArg, EventContentArg, EventSourceFunc} from '@fullcalendar/core';
import dayjs from 'dayjs';
import {DateTime} from 'luxon';
import {get} from 'lodash';

import {useEventContext} from '../context/eventContext';
import {EventModal} from '../event/EventModal';
import {GET_LIST} from '../ra-nest/types';
import {calendarHeadDateFormat, eventsResource, userRoleAdmin} from '../constants';
import {ICurrentUser, IEvent, IService} from '../interfaces';
import {parseEvents} from '../utils';

import classes from './calendar.module.css';
import {forceEventsUpdateType, setEventsType} from '../context/types';
import {AddEventButton} from '../components/AddEventButton';
import {useCurrentUser} from '../hooks/useCurrentUser';

const renderEventContent = (eventContent: EventContentArg, user: ICurrentUser) => {
  const services = eventContent.event?.extendedProps?.services?.map((s: IService) => s.name).join(', ');
  const {roles = [], userId} = user;
  const isAdmin = roles.includes(userRoleAdmin);
  const showInfo =
    isAdmin ||
    userId === eventContent.event?.extendedProps?.customerId ||
    userId === eventContent.event?.extendedProps?.masterId;

  return showInfo ? (
    <div style={{padding: '2px', overflow: 'hidden'}}>
      <i>{eventContent.timeText}</i>
      <p>
        <b>{eventContent.event.title}</b>
        {' - '}
        <i>{eventContent.event?.extendedProps?.phone}</i>
      </p>
      <p style={{marginTop: '2px', marginBottom: '2px', overflow: 'hidden'}}>
        Майстер - {eventContent.event?.extendedProps?.masterName}
      </p>
      <p style={{marginTop: '2px', marginBottom: '2px', whiteSpace: 'pre-wrap', overflow: 'hidden'}}>{services}</p>
    </div>
  ) : null;
};

export const Calendar = (props: WithPermissionsChildrenParams) => {
  const translate = useTranslate();
  const currentUser = useCurrentUser();
  const dataProvider = useDataProvider();
  const {state, dispatch} = useEventContext();
  const {events = [], forceUpdate = false} = state;
  const ref = useRef<FullCalendar>(null);
  const api = useMemo(() => ref.current?.getApi(), [ref.current]);

  console.log(api, 'API');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const calendarProps = useMemo(() => {
    return isMobile
      ? {
          headerToolbar: {
            left: 'prev,next',
            right: 'timeGridWeek,timeGridDay',
          },
        }
      : {
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          },
        };
  }, [isMobile]);

  const [showEventModal, setShowEventModal] = useState(false);

  useEffect(() => {
    if (forceUpdate && api) {
      dispatch({type: forceEventsUpdateType});

      api.refetchEvents();
    }
  }, [forceUpdate]);

  const handleToggleEventModal = () => setShowEventModal(s => !s);

  const fetchEvents: EventSourceFunc = useCallback((fetchInfo, successCallback, failureCallback) => {
    const {startStr, endStr} = fetchInfo;
    const start = DateTime.fromISO(startStr).toMillis();
    const end = DateTime.fromISO(endStr).toMillis();

    try {
      // @ts-ignore
      dataProvider(GET_LIST, eventsResource, {
        filter: {
          created: {between: [start, end]},
        },
      }).then((res: Response) => {
        const events: IEvent[] = get(res, 'data', []);
        const parsedEvents = parseEvents(events, currentUser);

        dispatch({type: setEventsType, payload: parsedEvents});
        successCallback(parsedEvents);
      });
    } catch (e) {
      failureCallback(e as Error);
    }
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // todo use select date for create event
    handleToggleEventModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const {roles = [], userId} = currentUser;
    const isAdmin = roles.includes(userRoleAdmin);
    
    if (isAdmin) {
      // show admin edit modal or go to edit page
      
      return;
    }
    
    if (userId === clickInfo.event?.extendedProps?.customerId) {
      // show edit for customer
      
      return;
    }
    
    if (userId === clickInfo.event?.extendedProps?.masterId) {
      // show for master, maybe for manager to
      
      return;
    }
    
    // or ignore click
  };

  return (
    <Fragment>
      {isMobile && (
        <p className={classes.calendarHeaderDate}>{api ? dayjs(api.getDate()).format(calendarHeadDateFormat) : null}</p>
      )}
      <FullCalendar
        {...calendarProps}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, luxon2Plugin, bootstrap5Plugin]}
        themeSystem='bootstrap5'
        height='100vh'
        scrollTime={1}
        ref={ref}
        nowIndicator={true}
        firstDay={1}
        events={fetchEvents}
        initialView='timeGridDay'
        loading={isLoading => {
          console.log(isLoading, 'isLoading');
        }}
        editable={true}
        allDaySlot={false}
        displayEventTime={true}
        displayEventEnd={true}
        allDayText={translate('calendar.all_day')}
        weekText={translate('calendar.week')}
        buttonText={{
          today: translate('calendar.today'),
          month: translate('calendar.month'),
          day: translate('calendar.day'),
          week: translate('calendar.week'),
          nextYear: translate('calendar.next_year'),
          prevYear: translate('calendar.prev_year'),
        }}
        stickyHeaderDates={true}
        selectable={true}
        selectMirror={true}
        slotDuration='00:30'
        slotMinTime='08:00:00'
        slotMaxTime='22:00:00'
        slotLabelInterval='00:30'
        slotLabelClassNames={['slot-label']}
        slotEventOverlap={false}
        slotLabelFormat={{
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
          omitZeroMinute: false,
        }}
        slotLaneClassNames={['row-height']}
        expandRows={true}
        select={handleDateSelect}
        buttonHints={{
          next: translate('calendar.next'),
          prev: translate('calendar.prev'),
          today: translate('calendar.today'),
        }}
        eventContent={event => renderEventContent(event, currentUser)}
        eventClick={handleEventClick}
        eventDidMount={mountArg => {}}
        eventsSet={events => {
          console.log(events, '=-=-=--=-=-=-=- Events SET =-=-=--=-=-=-=-');
        }}
        eventAdd={function (p) {
          console.log(p, 'eventAdd');
        }}
        eventChange={function (p) {
          console.log(p, 'eventChange');
        }}
        eventRemove={function (p) {
          console.log(p, 'eventRemove');
        }}
        eventDragStart={function (p) {
          console.log(p, 'eventDragStart');
        }}
        eventDragStop={function (p) {
          console.log(p, 'eventDragStop');
        }}
        locale='uk'
      />
      {showEventModal && <EventModal open={showEventModal} onClose={handleToggleEventModal} events={events} />}
      <AddEventButton onClick={handleToggleEventModal} />
    </Fragment>
  );
};
