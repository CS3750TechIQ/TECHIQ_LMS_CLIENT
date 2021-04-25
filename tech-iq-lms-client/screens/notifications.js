import React, { useState } from 'react';
import styled from "styled-components";
import { useUser } from "../hooks/useUser";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import NotificationCard from "../components/notificationCard";
import Nav from "../components/navBar";

const Styles = styled.div``;

async function fetchNotifications(studentId) {
  return await axios
    .get("http://localhost:50058/Account/" + studentId + "/getNotifications")
    .then((res) => res.data);
}

async function updateNotificationStatus(studentId) {
  return await axios.put("http://localhost:50058/Account/" + studentId + "/updateViewedNotificationStatus")
}

export default function Notifications() {
  const [user, setUser] = useUser();  
  const notificationsQuery = useQuery(
    ["notifications", user.studentId],
    async () => {
      return await fetchNotifications(user.studentId);
    }, {
      onSuccess: () => {
        updateNotificationStatus(user.studentId);
      },
      refetchInterval: false
    }
  );

  if (notificationsQuery.isLoading) {
    return "...Loading";
  }

  if (notificationsQuery.isError) {
    return "Something went wrong when trying to get your notifications";
  }

  return (
    <Styles>
      <Nav />
      {notificationsQuery.data.length > 0 ? (
        notificationsQuery.data.map((p) => (
          <NotificationCard
            title={p.assignment_title}
            description={p.assignment_desc}
            assignmentId={p.assignmentID}
            userId={user.studentId}
          />
        ))
      ) : (
        <div>You have no notifications</div>
      )}
    </Styles>
  );
}
