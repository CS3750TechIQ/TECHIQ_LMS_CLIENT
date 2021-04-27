import styled from "styled-components";
import { Link } from "react-router-dom";
import BellIcon from "react-bell-icon";
import Router from "next/router";
import { useState } from "react";
import { useQueryClient, useQuery } from "react-query";
import { useUser } from "../hooks/useUser";
import axios from "axios";
import NotificationCard from "../components/notificationCard";

const NavStyles = styled.div`
  a {
    color: inherit;
    text-decoration: none;
  }

  .navContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #072f5f;
    color: white;
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem;
  }

  .pageLinks {
    display: flex;
    align-items: center;
    padding: 1rem;

    a,
    div {
      padding: 1rem;
    }

    a:hover,
    div:hover {
      color: #58cced;
    }
  }

  .notificationsContainer {
    position: absolute;
    top: 110;
    right: 0;
    width: 25%;
    background-color: white;
    z-index: 3;
    box-shadow: 3px 3px 5px #58cced;
    border: 1px 1px gray;
    border-radius: 0.5rem;
    padding: 1rem;
  }
`;

async function fetchNotifications(studentId) {
  return await axios
    .get("http://localhost:50058/Account/" + studentId + "/getNotifications")
    .then((res) => res.data);
}

async function updateNotificationStatus(studentId) {
  return await axios.put(
    "http://localhost:50058/Account/" +
      studentId +
      "/updateViewedNotificationStatus"
  );
}

export default function Nav() {
  const [user, setUser] = useUser();
  const [isBellAnimated, setIsBellAnimated] = useState(false);
  const [showingNotifications, setShowingNotifications] = useState(false);

  const notificationsQuery = useQuery(
    ["notifications", user.studentId],
    async () => {
      if(user.userType === "Student")
        return await fetchNotifications(user.studentId);
      return null;
    },
    {
      onSuccess: (data) => {
        if(user.userType === "Student")
        {
          updateNotificationStatus(user.studentId);
          if (data?.length > 0) setIsBellAnimated(true);
        }
      },
      refetchInterval: false,
    }
  );

  if (notificationsQuery.isLoading) {
    return "...Loading";
  }

  if (notificationsQuery.isError) {
    return "Something went wrong when trying to get your notifications";
  }
  return (
    <NavStyles>
      {console.log(notificationsQuery.data)}
      <div className="navContainer">
        <div className="title">
          <Link to="/">
            <a>Canvas | {user?.username}</a>
          </Link>
        </div>
        <div className="pageLinks">
          <Link to="/account">
            <a>Account</a>
          </Link>
          <Link to="/dashboard">
            <a>Dashboard</a>
          </Link>
          {user.userType === "Instructor" ? (
            <Link to="/courses">
              <a>Courses</a>
            </Link>
          ) : (
            <Link to="/registercourses">
              <a>Registration</a>
            </Link>
          )}
          {user?.userType === "Student" ? (
            <div>
              <Link to="/tuition">
                <a>Tuition</a>
              </Link>
            </div>
          ) : null}
          <Link to="/calendar">
            <a>Calendar</a>
          </Link>
          {user.userType == "Student" ? (
            <div className="notificationButton">
              <a
                href="#"
                onClick={() => {
                  showingNotifications
                    ? setShowingNotifications(false)
                    : setShowingNotifications(true);
                }}
              >
                <BellIcon width="30" animate={isBellAnimated} color="white" onClick={() => {setIsBellAnimated(false)}}/>
              </a>
            </div>
          ) : null}
        </div>
      </div>
      {showingNotifications ? (
        <div className="notificationsContainer">
          <h3>Notifications</h3>
          {notificationsQuery.data.length > 0 ? (
            notificationsQuery.data.map((p) => (
              <NotificationCard
                notificationId={p.notificationId}
                title={p.assignment_title}
                description={p.assignment_desc}
                assignmentId={p.assignmentID}
                userId={user.studentId}
              />
            ))
          ) : (
            <div>You have no notifications</div>
          )}
        </div>
      ) : null}
    </NavStyles>
  );
}
