import React, {useState} from 'react';
import {WithPermissionsChildrenParams} from "ra-core/src/auth/WithPermissions";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {DateSelectArg, EventApi, EventClickArg, EventContentArg, formatDate} from "@fullcalendar/core";
import {useTranslate} from "react-admin";

import {createEventId, INITIAL_EVENTS} from "../calendar/utils";

const renderEventContent = (eventContent: EventContentArg) => {
  console.log(eventContent, 'eventContent')
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}

const renderSidebarEvent = (event: EventApi) => {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}

export const Dashboard = (props: WithPermissionsChildrenParams) => {
  const translate = useTranslate();
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const handleWeekendsToggle = () => setWeekendsVisible(s => !s);

  const renderSidebar = () => {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({events.length})</h2>
          <ul>
            {events.map(e => renderSidebarEvent(e as unknown as EventApi))}
          </ul>
        </div>
      </div>
    )
  };

  console.log(props, 'DashboardProps')
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log(selectInfo, 'selectInfo');
    let title = prompt('title')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log(clickInfo, 'clickInfo')
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events: EventApi[]) => {
    setEvents(events as []);
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialView="dayGridWeek"
      loading={(isLoading) => {
        console.log(isLoading, 'isLoading')
      }}
      editable={true}
      _resize={(r) => {
        console.log(r, 'resize')
      }}
      allDaySlot={true}
      buttonText={{
        today: translate('calendar.today'),
        month: translate('calendar.month'),
        day: translate('calendar.day'),
        week: translate('calendar.week'),
      }}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      navLinks={true}
      weekends={weekendsVisible}
      initialEvents={events}
      select={handleDateSelect}
      eventContent={renderEventContent}
      eventClick={handleEventClick}
      eventsSet={handleEvents}
      eventAdd={function (p) {
        console.log(p, 'eventAdd')
      }}
      eventChange={function (p) {
        console.log(p, 'eventChange')
      }}
      eventRemove={function (p) {
        console.log(p, 'eventRemove')
      }}
      eventDragStart={function (p) {
        console.log(p, 'eventDragStart')
      }}
      eventDragStop={function (p) {
        console.log(p, 'eventDragStop')
      }}
      locale="uk"
    />
  );
};