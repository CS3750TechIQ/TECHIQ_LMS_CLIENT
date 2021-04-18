import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import { useUser } from "../hooks/useUser"
//full calendar nonsense
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const CalendarStyles = styled.div``;

async function getAllAssignments(username, userType){
  if(userType === 'Student')
  {
      return await axios
        .get("http://localhost:50058/Account/" + username + "/getAllRegisteredCoursesAssignments")
        .then((res) => res.data)
  }
  
  if(userType === 'Instructor')
  {
      return await axios
        .get("http://localhost:50058/Account/" + username + "/getInstructorAssignments")
        .then((res) => res.data)
  }

  return null;
}

export default function Calendar() {
  const [ user, setUser ] = useUser();
  const assignmentInfoQuery = useQuery([user?.username], async() => {
    return await getAllAssignments(user?.username, user?.userType)})

  const getInitialEvents = () => {
    const assignments= [];
    for(var i = 0; i <= assignmentInfoQuery.data?.length; i++){
      assignments.push({
        title: assignmentInfoQuery.data[i]?.assignment_title,
        start: assignmentInfoQuery.data[i]?.due_date
      })
    }
    return assignments;
  }

  if (assignmentInfoQuery.isLoading) {
    return "Loading...";
  }

  if (assignmentInfoQuery.isError) {
    return "There was an error getting user info.";
  }

  return (
    <CalendarStyles>
      <Nav />
      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        nowIndicator={true}
        editable={true}
        initialEvents={getInitialEvents()}
      />
    </CalendarStyles>
  );
}