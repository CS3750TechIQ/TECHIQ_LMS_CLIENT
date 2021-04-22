import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
// Components
import Nav from "../components/navBar";
import BarGraph from "../components/Bar";

const AssignmentStyles = styled.div`
  .submissionHeader {
    padding: 1rem;
    border-bottom: 1px solid #072f60;
  }
  .assignmentDetails {
    margin: 1rem;
  }

  .submissions {
    padding-bottom: 1rem;
  }
`;

const SubmissionStyles = styled.div`
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

  .cardHeader {
    display: flex;
  }

  div {
    padding: 0.5rem 1rem 0 0;
  }
`;

function useQueryParameters() {
  return new URLSearchParams(useLocation().search);
}

const fetchAssignmentInfo = async (assignmentId) => {
  return await axios
    .get(
      "http://localhost:50058/Account/" + assignmentId + "/getAssignmentByID"
    )
    .then((res) => {
      return res.data;
    });
};

const fetchSubmissionInfo = async (assignmentId) => {
  return await axios
    .get(
      "http://localhost:50058/Account/" +
        assignmentId +
        "/getAssignmentSubmissions"
    )
    .then((res) => {
      return res.data;
    });
};

async function fetchAnalytics(assignmentID) {
  return await axios
    .get(
      "http://localhost:50058/Account/" +
        assignmentID +
        "/getAssignmentAnalytics"
    )
    .then((res) => res.data);
}

export default function InstructorAssignment() {
  let query = useQueryParameters();
  const [assignmentID, setAssignmentID] = useState(query.get("assignmentId"));
  const assignmentInfoQuery = useQuery(
    ["assignment", assignmentID],
    async () => {
      return await fetchAssignmentInfo(assignmentID);
    }
  );

  const submissionInfoQuery = useQuery(
    ["submissions", assignmentID],
    async () => {
      return await fetchSubmissionInfo(assignmentID);
    }
  );

  const analyticsInfoQuery = useQuery(["analytics", assignmentID], async () => {
    return await fetchAnalytics(assignmentID);
  });

  if (
    assignmentInfoQuery.isLoading ||
    analyticsInfoQuery.isLoading ||
    submissionInfoQuery.isLoading
  ) {
    return "Loading...";
  }

  if (
    assignmentInfoQuery.isError ||
    analyticsInfoQuery.isError ||
    submissionInfoQuery.isError
  ) {
    return "Something went wrong when trying to get this assignment.";
  }
  return (
    <AssignmentStyles>
      <Nav />
      <div className="assignmentDetails">
        <h1>Assignment Details</h1>
        <h2>{assignmentInfoQuery.data.assignment_title}</h2>
        <h3>Assignment Description:</h3>
        <div>{assignmentInfoQuery.data.assignment_desc}</div>
        <h3>Due Date:</h3>
        <div>{assignmentInfoQuery.data.due_date}</div>
        <BarGraph
          label="Assignment Analytics"
          dataValues={[
            analyticsInfoQuery.data.firstPercentile.length,
            analyticsInfoQuery.data.secondPercentile.length,
            analyticsInfoQuery.data.thirdPercentile.length,
            analyticsInfoQuery.data.fourthPercentile.length,
          ]}
        />
      </div>
      <h2 className="submissionHeader">Submissions</h2>
      <div className="submissions">
        {submissionInfoQuery?.data?.length > 0 ? (
          submissionInfoQuery?.data.map((p) => (
            <Submission
              firstName={p.studentFirstName}
              lastName={p.studentLastName}
              assignmentID={p.assignmentID}
              studentId={p.studentId}
              submission={p.submission}
              submissionDate={p.submission_date}
              grade={p.grade}
            />
          ))
        ) : (
          <div>There are no submissions for this assignment.</div>
        )}
      </div>
    </AssignmentStyles>
  );
}

function Submission({
  firstName,
  lastName,
  assignmentID,
  studentId,
  submission,
  submissionDate,
  grade,
}) {
  return (
    <SubmissionStyles>
      <Link
        className="assignmentLink"
        to={
          "/submissionDetails?studentId=" +
          studentId +
          "&assignmentId=" +
          assignmentID +
          "&firstName=" +
          firstName +
          "&lastName=" +
          lastName
        }
      >
        <div className="assignmentCard">
          <div className="cardHeader">
            <div>
              <strong>Student Name: </strong> {firstName + lastName}
            </div>
            <div>
              <strong>Date Submitted: </strong>
              {submissionDate}
            </div>
          </div>
          <div>
            <strong>Grade:</strong>
            {grade}
          </div>
        </div>
      </Link>
    </SubmissionStyles>
  );
}
