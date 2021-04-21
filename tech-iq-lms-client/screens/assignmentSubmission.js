import React, { useState } from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useUser } from "../hooks/useUser";
import Moment from "moment";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

const AssignmentSubmissionStyles = styled.div`
  .subTitle {
    font-weight: 999;
  }
  .dataTypeContainer {
    display: flex;
    flex-direction: row;
  }
  .dataFields {
    margin-left: auto;
    margin-right: auto;
  }
  .subBody {
    margin: 5%;
  }
  .buto {
    background-color: #072f5f;
    border-radius: 4px;
    box-shadow: 1px 1px 5px #141a18;
    color: #ffffff;

    :active {
      background-color: #f3f2ee;
      box-shadow: 0 3px #666;
      transform: translateY(2px);
    }
  }
  .butoContainer {
    text-align: center;
  }
`;

async function getAssignmentInfo(assignmentID) {
  return await axios
    .get(
      "http://localhost:50058/Account/" + assignmentID + "/getAssignmentByID"
    )
    .then((res) => res.data);
}

async function getSubmissionInfo(assignmentID, studentId) {
  return await axios
    .get(
      "http://localhost:50058/Account/" +
        assignmentID + "/" +
        studentId +
        "/GetStudentSubmission"
    )
    .then((res) => res.data);
}

function useQueryParameters() {
  return new URLSearchParams(useLocation().search);
}

function handleSubmit(e){
  this.submissionTextBox.value="";
}

export default function AssignmentSubmission() {
  let query = useQueryParameters();
  const [courseNumber] = useState();
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useUser();
  const [assignmentID, setAssignmentID] = useState(query.get("assignmentID"));
  const [studentId, setStudentId] = useState(query.get("userID"));
  console.log("userID" + studentId)
  const fileChanged = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsText(e.target.files[0]);
  };

  const assignment = useQuery(["assignmentInfo", assignmentID], async () => {
    return await getAssignmentInfo(assignmentID);
  });

  const submissionInfoQuery = useQuery(
    ["submissionInfo", assignmentID, studentId],
    async () => {
      return await getSubmissionInfo(assignmentID, studentId);
    }
  );

  const submitAssignment = useMutation(
    async () => {
      const data = await axios.put(
        "http://localhost:50058/Account/SubmitAssignment",
        {
          course_number: assignment.data.course_number,
          AssignmentID: assignment.data.assignmentID,
          studentId: user?.studentId,
          submission_file: selectedFile?.name,
          submission_date: new Date(),
          submission: text
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        alert("Assignment successfully submitted.");
        
      },
      onError: (err) => {
        alert("Error submitting assignment.");
      },
    }
  );

  if (assignment.isLoading) {
    return "Loading...";
  }
  if (assignment.isError) {
    return "Something went wrong...";
  }


//submissionInfoQuery?.data?.______
  return (
    <AssignmentSubmissionStyles>
      <Nav />
      <div className="subBody">
        <h3>Assignment: {assignment.data.assignment_title}</h3>
        <hr />
        <div className="dataTypeContainer">
          <div className="dataFields">
            <label className="subTitle">Due: </label>
            {Moment(assignment.due_date).format("lll")}
          </div>
          <span>
            <div className="dataFields">
              <label className="subTitle">Grade: </label>
              {submissionInfoQuery?.data?.grade}
            </div>
          </span>
          <div class="dataFields">
            <label className="subTitle">Points: </label>
            {assignment.data.max_points}
          </div>
          <div className="dataFields">
              <label className="subTitle">Submission: </label>
              {submissionInfoQuery?.data?.submission}
            </div>
        </div>
        <hr />
        <div class="dataTypeContainer">
          <div>
            <label className="subTitle">Submit File </label>
          </div>
          <input
            type="file"
            accept="*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

          <div>
            <label className="subTitle">Enter text </label>
          </div>
          <textarea
            className="txtBox"
            id="submissionTextBox"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <div class="butoContainer">
          <button
            className="buto"
            onClick={() => {
              submitAssignment.mutate();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </AssignmentSubmissionStyles>
  );
}
