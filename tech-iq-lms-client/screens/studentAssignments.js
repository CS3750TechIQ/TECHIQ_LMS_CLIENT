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

const AssignmentSubmissionStyles = styled.div`
   .subTitle{
       font-weight: 999;
   }
   .dataTypeContainer{
        display: flex;
        flex-direction: row;
   }
   .dataFields{
       margin-left: auto;
       margin-right: auto;
   }
   .subBody{
       margin: 5%;
   }
   .buto{
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
   .butoContainer{
        text-align: center;
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
  const [viewSubmitPage, setViewSubmitPage] = useState(false);
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
      {viewSubmitPage ? (
        <AssignmentSubmission
          viewSubmitPage={viewSubmitPage}
          setViewSubmitPage={setViewSubmitPage}
          assignment={assignment}
          setAssignment={setAssignment}
        />
      ) : 
      (
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
        </div>
      )}
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
        <button
          type="button"
          onClick={() => {
            props.setViewSubmitPage(true)
            props.setAssignment(props)
          }}
        >
          Submit
        </button>
      </td>
    </tr>
  );
}

function AssignmentSubmission(props) {
    const [courseNumber] = useState();
    const [text, setText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [user, setUser] = useUser();

    const fileChanged = (e) =>  {
        const reader = new FileReader();
        reader.onload = () => {
        setSelectedFile(reader.result);
        };
        reader.readAsText(e.target.files[0]);
    }

    const assignment = props.assignment
    const submitAssignment = useMutation(
        async () => {
          const data = await axios.put(
            "http://localhost:50058/Account/SubmitAssignment",
            {
              course_number: assignment.courseNumber,
              AssignmentID: assignment.assignmentID,
              studentId: user?.studentId,
              submission_file: selectedFile.name,
              submission_date: new Date()
            }
          )
          return data
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

    return (
    <AssignmentSubmissionStyles>
      <Nav />
      <div className="subBody">
        <h3>{assignment.assignment_title}</h3>
        <hr/>
        <div className="dataTypeContainer">
            <div className="dataFields">
                <label className="subTitle">Due </label>
                {Moment(assignment.due_date).format("lll")}
            </div>
            <span><div className="dataFields">
            <label className="subTitle">Submitting </label> 
                {assignment.submission_type}
            </div></span>
            <div class="dataFields">
                <label className="subTitle">Points </label>  
                {assignment.max_points}
            </div>
        </div>
        <hr/>
        <div>
            {assignment.assignment_desc}
        </div>
        <hr/>
        <div class="dataTypeContainer">
        <div><label className="subTitle">Submit File </label></div>
            <input
            type="file"
            accept="*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            <div><label className="subTitle">Enter text </label></div>
            <textarea
            className="txtBox"
            type="text"
            value={text}
            onChange={fileChanged}
            ></textarea>
        </div>

        <div class="butoContainer"><button className="buto" onClick={() => {submitAssignment.mutate();}}>Submit</button></div>
        <a href="#" onClick={() => {props.setViewSubmitPage(false)}}>Go Back to Assignments</a>
        </div>
    </AssignmentSubmissionStyles>
  );  
}
export default StudentAssignments;
