import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { useUser } from "../hooks/useUser";
import {useMutation} from "react-query";

const CourseStyles = styled.div`
  .addCourseContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: auto;
  }

  .buttonContainerCourse {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  .courseListContainer {
    display: flex;
    justify-content: center;
  }

  .courseTitle {
    text-align: center;
    color: #072f60;
  }

  .courseButton {
    background-color: #072f60;
    color: #ffffff;
    margin: 20px;
    padding: 5px;
  }

  .courseListButtonsP {
    display: flex;
    justify-content: space-evenly;
  }
  .courseListButtonsE {
    background-color: #44a04b;
  }
  .courseListButtonsD {
    background-color: #ca2e2f;
  }
  .courseReturn {
    font-weight: bold;
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

  td {
  }
`;

const CourseAssignmentStyles = styled.div`
  h1 {
    padding-left: 1rem;
  }

  input[type="radio"] {
    transform: scale(1.4);
  }

  input[type="date"],
  input[type="text"],
  textarea {
    appearance: none;
    -webkit-appearance: none;
    color: #95a5a6;
    font-family: "Helvetica", arial, sans-serif;
    font-size: 18px;
    border: 1px solid #ecf0f1;
    padding: 8px;
    display: inline-block !important;
    visibility: visible !important;
  }

  input[type="date"],
  input[type="text"],
  textarea,
  focus {
    color: #95a5a6;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 2rem;
    width: 50%;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 0.25rem;
    border: 1px solid #a0a0a0;

    .dataTitle {
      font-weight: bold;
      padding: 0.5rem 0 0.5rem 0;
    }
  }

  .formButton {
    font-size: 1.2rem;
    margin: 0.5rem 0 0.5rem 0;
    width: 250px;
    padding: 0.5rem;
    color: white;
    border: 1px solid #a0a0a0;
    border-radius: 0.5rem;
    background-color: #0a66c2;

    :hover {
      transform: scale(1.1);
    }
  }

  .radio {
    margin: 0.5rem;
  }

  .newCourse {
    width: 1000px;
    margin: 2rem;
  }

  .assignmentsContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .assignment {
    flex-basis: 50%;
  }

  .goBackContainer {
    text-align: center;
    margin: 2rem;
  }

  .goBackButton {
    text-align: center;
    color: #072f60;
    font-weight: bold;
  }

  .noAssignmentsText {
    margin: 2rem;
    text-align: center;
    font-size: 1.4rem;
  }

  .existingAssignments {
    font-size: 1.75rem;
    font-weight: bold;
    border-bottom: 1px solid #072f60;
    padding-left: 1rem;
  }
`;

const AssignmentStyles = styled.div`
  .assignmentLink {
    text-decoration: none;
    color: black;
  }

  .assignmentCard {
    padding: 1rem;
    border-bottom: 1px solid #072f60;

    :hover {
      background-color: #3CB043;
    }
  }

  .cardHeader {
    display: flex;

  }

  div {
    padding: .5rem 1rem 0 0;
  }
}

`;

const getAssignments = async (courseNum) => {
  console.log(courseNum)
  return await axios
    .get("http://localhost:50058/Account/" + courseNum + "/getAssignments")
    .then((res) => res.data);
};

const getInstructorInfo = async (instructorId) => {
  return await axios
    .get(
      "http://localhost:50058/Account/" + instructorId + "/getInstructorCourses"
    )
    .then((res) => res.data);
};

export default function Courses() {
  const [viewingCourse, setViewingCourse] = useState(false);
  const [selectedCourseNum, setSelectedCourseNum] = useState();

  return (
    <div>
      {!viewingCourse ? (
        <CourseListPage
          selectedCourseNum={selectedCourseNum}
          setSelectedCourseNum={setSelectedCourseNum}
          viewingCourse={viewingCourse}
          setViewingCourse={setViewingCourse}
        />
      ) : (
        <CourseAssignments
          selectedCourseNum={selectedCourseNum}
          setSelectedCourseNum={setSelectedCourseNum}
          viewingCourse={viewingCourse}
          setViewingCourse={setViewingCourse}
        />
      )}
    </div>
  );
}

function CourseListPage(props) {
  
  const [user, setUser] = useUser();


  const instructorCourses = useQuery(
    ["courseList", user?.username],
    async () => {
      return await getInstructorInfo(user?.instructorid);
    },
    {
      enabled: !!user?.username,
    }
  );

  if (instructorCourses.isLoading) {
    return "Loading...";
  }

  if (instructorCourses.isError) {
    return "There was an error getting your courses";
  }

  return (
    <CourseStyles>
      <Nav />
      <div className="addCourseContainer">
        <h1 className="courseTitle">Course list</h1>

        <div className="buttonContainerCourse">
          <button type="button" className="courseButton">
            Edit Course list
          </button>
          <form action="/addcourses">
            <button type="submit" className="courseButton">
              Create new course
            </button>
          </form>
        </div>
        <CourseList
          selectedCourseNum={props.courseNum}
          setSelectedCourseNum={props.setSelectedCourseNum}
          viewingCourse={props.viewingCourse}
          setViewingCourse={props.setViewingCourse}
          instructorCourses={instructorCourses.data}
        />
        <a className="courseTitle courseReturn" href="/">
          Return to Dashboard
        </a>
      </div>
    </CourseStyles>
  );
}

function CourseList(props) {

  return (
    <CourseStyles>
      <div className="courseListContainer">
        <table>
          <tr>
            <th>Department</th>
            <th>Course number</th>
            <th>Course name</th>
            <th>Meeting time</th>
            <th>Location</th>
            <th>Days</th>
            <th>Max. capacity</th>
            <th> </th>
          </tr>
          {props.instructorCourses.length > 0 ? (
            props.instructorCourses.map((p) => (
              <Course
                setSelectedCourseNum={props.setSelectedCourseNum}
                setViewingCourse={props.setViewingCourse}
                department={p.department}
                course_number={p.course_number}
                course_name={p.course_name}
                start_time={p.start_time}
                end_time={p.end_time}
                location={p.location}
                days={p.days}
                capacity={p.capacity}
              />
            ))
          ) : (
            <div>You have no courses</div>
          )}
        </table>
      </div>
    </CourseStyles>
  );
}

function Course(props) {

  const viewCourseDetails = (courseNum) => {
    props.setSelectedCourseNum(courseNum);
    props.setViewingCourse(true);
  };

  const deleteCourseMutation = useMutation(async () => {
    const { data } = await axios.delete(
      "http://localhost:50058/Account/" +
        instructorId +
        "/" +
        number +
        "/deleteCourse"
    );
    return data;
  });

  return (
    <tr>
      <td>{props.department}</td>
      <td>{props.course_number}</td>
      <td>{props.course_name}</td>
      <td>
        {props.start_time} - {props.end_time}
      </td>
      <td>{props.location}</td>
      <td>{props.days}</td>
      <td>{props.capacity}</td>
      <td className="courseListButtonsP">
        <button className="courseListButtonsE">Edit</button>
        <button 
          className="courseListButtonsD"
          onClick={() => deleteCourseMutation.mutate()}
          >
          Delete
          </button>
        <Link to={"/courses?course=" + props.course_number}>
          <button
            className="detailsButton"
            onClick={() => {
              viewCourseDetails(props.course_number);
            }}
          >
            Details
          </button>
        </Link>
      </td>
    </tr>
  );
}

function CourseAssignments(props) {
  
  const router = useRouter();

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newMaxPoints, setNewMaxPoints] = useState("");
  const [newSubType, setNewSubType] = useState("");

  const assignmentsInfoQuery = useQuery(["assignments"], async () => {
    {console.log(props.selectedCourseNum)}
    return await getAssignments(props.selectedCourseNum);
  });

  const createAssignment = async () => {
    if (newTitle === null || newTitle === "") {
      setBlankFields(true);
      return;
    }
    if (newDesc === null || newDesc === "") {
      setBlankFields(true);
      return;
    }
    if (newDueDate === null || newDueDate === "") {
      setBlankFields(true);
      return;
    }
    if (newMaxPoints === null || newMaxPoints === "") {
      setBlankFields(true);
      return;
    }
    if (newSubType === null || newSubType === "") {
      setBlankFields(true);
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:50058/Account/addAssignment",
        {
          course_number: props.selectedCourseNum,
          assignment_title: newTitle,
          assignment_desc: newDesc,
          due_date: newDueDate,
          max_points: newMaxPoints,
          submission_type: newSubType,
        }
      );
      if (res.status === 200) {
        router.reload();
      }
    } catch (e) {
      alert(e);
    }
  };

  if (assignmentsInfoQuery.isLoading) {
    return "Loading...";
  }

  if (assignmentsInfoQuery.isError) {
    return "There was an error getting course info.";
  }

  return (
    <CourseAssignmentStyles>
      <Nav />
      <h1>Course Details</h1>
      <div className="newCourse">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAssignment();
          }}
        >
          <h2>New Assignment</h2>
          <label for="title" className="dataTitle">
            Assignment Title:{" "}
          </label>
          <input
            type="text"
            id="title"
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
          <label for="description" className="dataTitle">
            Assignment Description:{" "}
          </label>
          <textarea
            id="description"
            onChange={(e) => {
              setNewDesc(e.target.value);
            }}
          />
          <label for="dueDate" className="dataTitle">
            Due Date:{" "}
          </label>
          <input
            type="date"
            id="dueDate"
            onChange={(e) => {
              setNewDueDate(e.target.value);
            }}
          />
          <label for="points" className="dataTitle">
            Maximum Points:{" "}
          </label>
          <input
            type="text"
            id="points"
            onChange={(e) => {
              setNewMaxPoints(e.target.value);
            }}
          />
          <label className="dataTitle">Submission Type:</label>
          <div className="radioBlock">
            <label for="fileSubmission">File Submission</label>
            <input
              className="radio"
              type="radio"
              id="fileSubmission"
              name="submissionType"
              onChange={() => {
                setNewSubType("File Submission");
              }}
            />
            <label for="textEntry">Text Entry</label>
            <input
              className="radio"
              type="radio"
              id="textEntry"
              name="submissionType"
              onChange={() => {
                setNewSubType("Text Entry");
              }}
            />
          </div>
          <button type="submit" class="formButton">
            Create New Assignment
          </button>
        </form>
      </div>
      <div className="existingAssignments">Existing Assignments</div>
      <div className="assignmentsContainer">
        {assignmentsInfoQuery.data.length > 0 ? (
          assignmentsInfoQuery.data.map((p) => (
            <Assignment
              className="assignment"
              key={p.assignmentID}
              assignmentID={p.assignmentID}
              title={p.assignment_title}
              description={p.assignment_desc}
              courseNum={p.course_number}
              dueDate={p.due_date}
              submissionType={p.submission_type}
            />
          ))
        ) : (
          <div className="noAssignmentsText">
            This course has no assignments
          </div>
        )}
      </div>
      <div className="goBackContainer">
        <a
          className="goBackButton"
          href="#"
          onClick={() => {
            props.setViewingCourse(false);
          }}
        >
          Go back to your courses
        </a>
      </div>
    </CourseAssignmentStyles>
  );
}

function Assignment({
  title,
  description,
  courseNum,
  dueDate,
  submissionType,
  assignmentID
}) {
  return (
    <AssignmentStyles>
      <Link className="assignmentLink" to={"/instructorAssignment?assignmentId=" + assignmentID}>
          <div className="assignmentCard">
            <h3>{title}</h3>
            <div className="cardHeader">
              <div>
                <strong>Course Number: </strong> {courseNum}
              </div>
              <div>
                <strong>Due Date: </strong>
                {dueDate}
              </div>
            </div>
            <div>
              <strong>Description:</strong>
            </div>
            <div>{description}</div>
            <div>
              <strong>Submission Type: </strong>
              {submissionType}
            </div>
          </div>
      </Link>
    </AssignmentStyles>
  );
}
