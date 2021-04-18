import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useUser } from "../hooks/useUser";
import Moment from "moment";
import { Link } from "react-router-dom";

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

const AssignmentSubmissionStyles = styled.div`
   
`;

const fetchAllAssignments = async (username) => {
  return await axios
    .get(
      "http://localhost:50058/Account/" +
        username +
        "/getAllRegisteredCoursesAssignments"
    )
    .then((res) => {
      while (res.data.length > 5) {
        res.data.pop();
      }
      return res.data;
    });
};

const StudentAssignments = ({ courseNumber }) => {
  const [user, setUser] = useUser();
  const [viewSubmitPage, setViewSubmitPage] = useState(false);

  // function submitAssignment(value) {
  //     debugger;
  //     <RegisterCourses/>
  //     alert(assignment[value].assignment_title);
  //     console.log(assignment[value]);
  //   }
  const assignmentsListQuery = useQuery(
    ["assignmentList", user?.username],
    async () => {
      return await fetchAllAssignments(user?.username);
    }
  );

  return (
    <StudentAssignmentsStyles>
      {viewSubmitPage ? (
        <AssignmentSubmission
          viewSubmitPage={viewSubmitPage}
          setViewSubmitPage={setViewSubmitPage}
        />
      ) : (
        <div>
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
                        viewSubmitPage={viewSubmitPage}
                        setViewSubmitPage={setViewSubmitPage}
                        assignment_title={p.assignment_title}
                        assignment_desc={p.assignment_desc}
                        due_date={p.due_date}
                        max_points={p.max_points}
                      />
                    ))
                  ) : (
                    <div>You have no assignments</div>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </StudentAssignmentsStyles>
  );
};

function Assignment(props) {
  return (
    <tr>
      <td>{props.assignment_title}</td>
      <td>{props.assignment_desc}</td>
      <td> {Moment(props.due_date).format("lll")}</td>
      <td>{props.max_points}</td>
      <td className="">
        <button
          type="button"
          onClick={() => {
            props.setViewSubmitPage(true);
          }}
        >
          Submit
        </button>
      </td>
    </tr>
  );
}

function AssignmentSubmission(props) {
  return (
    <AssignmentSubmissionStyles>
      <Nav />
      <div>Text</div>
      <a href="#" onClick={() => {props.setViewSubmitPage(false)}}>Go Back to Assignments</a>
    </AssignmentSubmissionStyles>
  );
}
export default StudentAssignments;
