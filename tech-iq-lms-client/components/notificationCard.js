import React from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NotificationStyles = styled.div`
  .assignmentLink {
    text-decoration: none;
    color: black;
  }

  .assignmentCard {
    padding: 1rem;
    border-bottom: 1px solid #072f60;

    :hover {
      background-color: #3cb043;
    }
  }
`;

export default function NotificationCard({
  title,
  description,
  assignmentId,
  userId,
}) {
  return (
    <NotificationStyles>
      <Link
        className="assignmentLink"
        to={
          "/assignmentSubmission?assignmentID=" +
          assignmentId +
          "&userID=" +
          userId
        }
      >
        <div className="assignmentCard">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </NotificationStyles>
  );
}
