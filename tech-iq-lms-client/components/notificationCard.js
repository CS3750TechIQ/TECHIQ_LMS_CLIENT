import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../hooks/useUser";

const NotificationStyles = styled.div`
  .assignmentLink {
    text-decoration: none;
    color: black;
  }

  .assignmentCard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #072f60;

    :hover {
      background-color: #3cb043;
    }
  }

  .dismissButton {
    font-size: 2rem;
    font-weight: bold;
    padding: 0.4rem;

    :hover {
      color: #072f60;
    }
  }
`;

export default function NotificationCard({
  notificationId,
  title,
  description,
  assignmentId,
  userId
}) {
  const dismissNotificationMutation = useMutation(async () => {
    return await axios.delete(
      "http://localhost:50058/Account/" +
        userId + "/" + assignmentId +
        "/deleteSelectedNotification"
    );
  });
  console.log(notificationId)
  return (
    <NotificationStyles>
      <div className="assignmentCard">
        <Link
          className="assignmentLink"
          to={
            "/assignmentSubmission?assignmentID=" +
            assignmentId +
            "&userID=" +
            userId
          }
        >
          <div className="assignmentInfo">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </Link>
        <a
          href="#"
          className="dismissButton"
          onClick={() => {
            dismissNotificationMutation.mutate();
          }}
        >
          X
        </a>
      </div>
    </NotificationStyles>
  );
}
