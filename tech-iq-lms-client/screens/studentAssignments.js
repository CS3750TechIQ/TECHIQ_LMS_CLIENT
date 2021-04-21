import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useUser } from "../hooks/useUser";
import Moment from "moment";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const StudentAssignmentsStyles = styled.div`
  .addAssignmentContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: auto;
  }
  .assignmentContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: auto;
  }
  .assignmentListContainer {
    display: flex;
    justify-content: center;
  }

  table {
    border-collapse: collapse;
    width: 80%;
  }

  th {
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: #072f60;
    color: #ffffff;
    text-align: left;
  }
  tr {
    textalign: center;
    margin-bottom: 50px;
  }
  .assignmentListContainer {
    display: flex;
    justify-content: center;
  }

  .assignmentTitle {
    text-align: center;
    color: #072f60;
  }
`;

const fetchAllAssignments = async (courseNumber) => {
  return await axios
    .get("http://localhost:50058/Account/" + courseNumber + "/getAssignments")
    .then((res) => {
      while (res.data.length > 5) {
        res.data.pop();
      }
      return res.data;
    });
};

function useQueryParameters() {
  return new URLSearchParams(useLocation().search);
}

const StudentAssignments = () => {
  let query = useQueryParameters();
  const [courseNumber, setCourseNumber] = useState(query.get("courseNumber"));
  const [user, setUser] = useUser();
  const [assignment, setAssignment] = useState();

  // function submitAssignment(value) {
  //     debugger;
  //     <RegisterCourses/>
  //     alert(assignment[value].assignment_title);
  //     console.log(assignment[value]);
  //   }
  const assignmentsListQuery = useQuery(
    ["assignmentList", courseNumber],
    async () => {
      return await fetchAllAssignments(courseNumber);
    }
  );

  return (
    <StudentAssignmentsStyles>
      <Nav />
      <div className="addAssignmentContainer">
        <div className="assignmentContainer">
          <h1 className="assignmentTitle">{courseNumber} Assignments</h1>
          <div className="assignmentListContainer">
            <table>
              <tr>
                <th>Title</th>
                <th>Description</th> {/* Start and end time in DB table */}
                <th>Due Date</th>
                <th>Max Points</th>
                <th></th>
              </tr>
              {assignmentsListQuery.data?.length > 0 ? (
                assignmentsListQuery.data.map((p) => (
                  <Assignment
                    assignment_title={p.assignment_title}
                    assignment_desc={p.assignment_desc}
                    due_date={p.due_date}
                    max_points={p.max_points}
                    assignmentID={p.assignmentID}
                    submission_type={p.submission_type}
                    setAssignment={setAssignment}
                    courseNumber={courseNumber}
                  />
                ))
              ) : (
                <div>You have no assignments</div>
              )}
            </table>
          </div>
        </div>
      </div>
    </StudentAssignmentsStyles>
  );
};

function Assignment(props) {
  return (
    <tr key={props}>
      <td>{props.assignment_title}</td>
      <td>{props.assignment_desc}</td>
      <td> {Moment(props.due_date).format("lll")}</td>
      <td>{props.max_points}</td>
      <td className="">
        <Link to={"/assignmentSubmission?assignmentID=" + props.assignmentID}>
          <button
            type="button"
            onClick={() => {
              props.setAssignment(props);
            }}
          >
            Submit
          </button>
        </Link>
      </td>
    </tr>
  );
}

export default StudentAssignments;
