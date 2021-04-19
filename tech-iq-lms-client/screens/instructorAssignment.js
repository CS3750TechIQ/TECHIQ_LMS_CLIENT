import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
// Components
import Nav from "../components/navBar";

const AssignmentStyles = styled.div``;

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

  if (assignmentInfoQuery.isLoading) {
    return "Loading...";
  }

  if (assignmentInfoQuery.isError) {
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
      </div>
      <h2>Submissions</h2>
      <div className="submissions">
        {submissionInfoQuery.data.length > 0 ? (
          submissionInfoQuery.data.map((p) => (
            <Submission
              studentId={p.StudentId}
              submission={p.submission}
              submissionDate={p.submission_date}
            />
          ))
        ) : (
          <div>There are no submissions for this assignment.</div>
        )}
      </div>
    </AssignmentStyles>
  );
}

function Submission({ studentId, submission, submissionDate }) {
  return (
    <SubmissionStyles>
      <div className="assignmentCard">
        <div className="cardHeader">
          <div>
            <strong>Student Name: </strong> {studentId}
          </div>
          <div>
            <strong>Date Submitted: </strong>
            {submissionDate}
          </div>
        </div>
        <div>
          <strong>Submission:</strong>
        </div>
        <div>{submission}</div>
      </div>
    </SubmissionStyles>
  );
}
