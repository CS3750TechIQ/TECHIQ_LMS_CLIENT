import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useQuery } from "react-query";
import useLocalStorage from "../hooks/useLocalStorage";
//full calendar nonsense
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const CalendarStyles = styled.div``;

export default function Calendar() {
  const localUserData = useLocalStorage("user");

  return (
    <CalendarStyles>
      <Nav userType={localUserData[0].userType}/>
      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        nowIndicator={true}
        editable={true}
        initialEvents={[{ title: "nice event", start: new Date() }]}
      />
    </CalendarStyles>
  );
}
