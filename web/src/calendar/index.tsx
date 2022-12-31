import React, { Fragment, useCallback, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import luxon2Plugin from "@fullcalendar/luxon2";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
  EventInput,
  EventMountArg,
  EventSourceFunc,
} from "@fullcalendar/core";
import { useDataProvider, useTranslate } from "react-admin";
import { EventModal } from "./event/EventModal";
import { WithPermissionsChildrenParams } from "ra-core/src/auth/WithPermissions";
import { DateTime } from "luxon";
import { GET_LIST } from "../ra-nest/types";
import { eventsResource } from "../constants";
import { IEvent } from "../interfaces";
import { get } from "lodash";
import { parseEvents } from "../utils/eventUtils";

// const renderEventContent = (eventContent: EventContentArg) => {
//   // console.log(eventContent, 'eventContent')
//   return (
//     <>
//       <p>test</p>
//       <b>{eventContent.timeText}</b>
//       <i>{eventContent.event.title}</i>
//     </>
//   )
// }

export const Calendar = (props: WithPermissionsChildrenParams) => {
  const translate = useTranslate();
  const dataProvider = useDataProvider();
  const ref = useRef<FullCalendar>(null);
  const api = useMemo(() => ref.current?.getApi(), [ref.current]);
  console.log(api, "api");

  const [showEventModal, setShowEventModal] = useState(false);

  const handleToggleModal = () => setShowEventModal((s) => !s);

  const fetchEvents: EventSourceFunc = useCallback(
    (fetchInfo, successCallback, failureCallback) => {
      const { startStr, endStr } = fetchInfo;
      const start = DateTime.fromISO(startStr).toMillis();
      const end = DateTime.fromISO(endStr).toMillis();

      try {
        // @ts-ignore
        dataProvider(GET_LIST, eventsResource, {
          filter: {
            created: { between: [start, end] },
          },
        }).then((res: Response) => {
          const events: IEvent[] = get(res, "data.rows", []);
          successCallback(parseEvents(events));
          console.log(events);
        });
      } catch (e) {
        failureCallback(e as Error);
      }
    },
    []
  );

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // console.log(selectInfo, 'selectInfo')
    let title = prompt("title");

    api?.unselect(); // clear date selection

    if (title) {
      api?.addEvent({
        id: "1",
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    // console.log(clickInfo, 'clickInfo')
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  return (
    <Fragment>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          luxon2Plugin,
          bootstrap5Plugin,
        ]}
        ref={ref}
        nowIndicator={true}
        firstDay={1}
        events={fetchEvents}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "newEvent dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="timeGridDay"
        loading={(isLoading) => {
          console.log(isLoading, "isLoading");
        }}
        editable={true}
        allDaySlot={true}
        displayEventTime={true}
        displayEventEnd={true}
        eventDisplay="test"
        allDayText={translate("calendar.all_day")}
        weekText={translate("calendar.week")}
        buttonText={{
          today: translate("calendar.today"),
          month: translate("calendar.month"),
          day: translate("calendar.day"),
          week: translate("calendar.week"),
          nextYear: translate("calendar.next_year"),
          prevYear: translate("calendar.prev_year"),
        }}
        stickyHeaderDates={true}
        selectable={true}
        selectMirror={true}
        slotDuration="00:30"
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        slotLabelInterval="00:30"
        slotLabelFormat={{
          hour12: false,
          hour: "numeric",
          minute: "numeric",
          omitZeroMinute: false,
        }}
        slotLaneClassNames={["row-height"]}
        expandRows={true}
        select={handleDateSelect}
        themeSystem="bootstrap5"
        customButtons={{
          newEvent: {
            text: "Додати запис",
            click() {
              setShowEventModal(true);
            },
            icon: "plus-circle-dotted",
          },
        }}
        buttonHints={{
          next: translate("calendar.next"),
          prev: translate("calendar.prev"),
          today: translate("calendar.today"),
        }}
        // eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventDidMount={(mountArg) => {}}
        eventsSet={(events) => {
          console.log(events, "=-=-=--=-=-=-=- Events SET =-=-=--=-=-=-=-");
        }}
        eventAdd={function (p) {
          console.log(p, "eventAdd");
        }}
        eventChange={function (p) {
          console.log(p, "eventChange");
        }}
        eventRemove={function (p) {
          console.log(p, "eventRemove");
        }}
        eventDragStart={function (p) {
          console.log(p, "eventDragStart");
        }}
        eventDragStop={function (p) {
          console.log(p, "eventDragStop");
        }}
        locale="uk"
      />
      {showEventModal && (
        <EventModal open={showEventModal} onClose={handleToggleModal} />
      )}
    </Fragment>
  );
};
