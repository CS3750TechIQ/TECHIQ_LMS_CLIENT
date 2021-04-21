import React, { useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

//components
import Nav from "../components/navBar";

const SubmissionStyles = styled.div`
  input {
    width: 40px;
  }

  .topInfo {
    margin: 1rem;
  }

  .submission {
    margin: 1rem;
  }
`;

async function fetchSubmissionData(studentId, assignmentId) {
  return await axios
    .get(
      "http://localhost:50058/Account/" +
        assignmentId +
        "/" +
        studentId +
        "/GetStudentSubmission"
    )
    .then((res) => res.data);
}

function submitGrade(grade) {}

function useQueryParameters() {
  return new URLSearchParams(useLocation().search);
}

export default function SubmissionDetails() {
  let query = useQueryParameters();
  const [studentId, setStudentId] = useState(query.get("studentId"));
  const [assignmentId, setAssignmentId] = useState(query.get("assignmentId"));
  const [grade, setGrade] = useState();

  const submissionInfoQuery = useQuery(
    ["submission", studentId, assignmentId],
    async () => {
      const data = fetchSubmissionData(studentId, assignmentId);
      return data;
    }
  );

  const submitGradeMutation = useMutation(async () => {
    await axios.put("http://localhost:50058/Account/GradeAssignment", {
        grade,
        studentId,
        assignmentId
    });
  });

  if (submissionInfoQuery.isLoading) {
    return "Loading...";
  }
  if (submissionInfoQuery.isError) {
    return "Something went wrong while trying to get this assingment submission";
  }

  console.log(submissionInfoQuery);
  return (
    <SubmissionStyles>
      <Nav />
      <h1>Submission Details</h1>
      <div className="topInfo">
        <div>
          <h3>Student Name:</h3>
          <div></div>
        </div>
        <div>
          <h3>Submission Date:</h3>
          <div>{submissionInfoQuery?.data?.submission_date}</div>
        </div>
        <div>
          <h3>Grade:</h3>
          <div>{submissionInfoQuery?.data?.grade}</div>
        </div>
      </div>
      <div className="submission">
        <h3>Submission</h3>
        <div>{submissionInfoQuery?.data?.submission}</div>
        <h3>Enter Grade</h3>
        <input
          type="text"
          onChange={(e) => {
            setGrade(e.target.value);
          }}
        />
        <button
          onClick={() => {
            submitGradeMutation.mutate();
          }}
        >
          Submit
        </button>
      </div>
    </SubmissionStyles>
  );
}
