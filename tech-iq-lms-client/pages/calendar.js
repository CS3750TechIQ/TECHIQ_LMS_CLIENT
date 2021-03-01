import React from 'react';
import Nav from '../components/navBar';
import styled from 'styled-components';
//full calendar nonsense
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const CalendarStyles = styled.div`

`;

export default () => (
  <CalendarStyles>
    <Nav />
    <FullCalendar
      plugins={[interactionPlugin, timeGridPlugin]}
      initialView='timeGridWeek'
      nowIndicator={true}
      editable={true}
      initialEvents={[
        { title: 'nice event', start: new Date() }
      ]}
    />
  </CalendarStyles>
)