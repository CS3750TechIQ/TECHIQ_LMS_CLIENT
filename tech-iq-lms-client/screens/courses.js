import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

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
`;

const AssignmentStyles = styled.div`
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
  return await axios
    .get("http://localhost:50058/Account/" + courseNum + "/getAssignments")
    .then((res) => res.data);
};

export default function Courses() {
  const [viewingCourse, setViewingCourse] = useState(false);
  const [courseNum, setCourseNum] = useState();

  return (
    <div>
      {!viewingCourse ? (
        <CourseList
          courseNum={courseNum}
          setCourseNum={setCourseNum}
          viewingCourse={viewingCourse}
          setViewingCourse={setViewingCourse}
        />
      ) : (
        <CourseAssignments
          courseNum={courseNum}
          setCourseNum={setCourseNum}
          viewingCourse={viewingCourse}
          setViewingCourse={setViewingCourse}
        />
      )}
      {console.log(viewingCourse)}
    </div>
  );
}

function CourseList(props) {
  const localUserData = useLocalStorage("user");

  const viewCourseDetails = (courseNum) => {
    props.setCourseNum(courseNum);
    props.setViewingCourse(true);
  };

  return (
    <CourseStyles>
      <Nav userType={localUserData[0].userType} />
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
            <tr>
              <td>CS</td>
              <td>4120</td>
              <td>Under Water Basket Weaving</td>
              <td>11:30 - 1:30</td>
              <td>Online</td>
              <td>MW</td>
              <td>50</td>
                <button className="courseListButtonsE">Edit</button>
                <button className="courseListButtonsD">Delete</button>
                <button
                  className="detailsButton"
                  onClick={() => {
                    viewCourseDetails(4120);
                  }}
                >
                  Details
                </button>
              <td className="courseListButtonsP">
              </td>
            </tr>
            <tr>
              <td>CS</td>
              <td>2420</td>
              <td>Data Structures & Algorithms</td>
              <td>2:30 - 3:30</td>
              <td>Online</td>
              <td>MW</td>
              <td>50</td>
              <td className="courseListButtonsP">
                <button type="button" className="courseListButtonsE">
                  Edit
                </button>
                <button type="button" className="courseListButtonsD">
                  Delete
                </button>
                <button
                  className="detailsButton"
                  onClick={() => {
                    viewCourseDetails(2420);
                  }}
                >
                  Details
                </button>
              </td>
            </tr>
          </table>
        </div>
        <a className="courseTitle courseReturn" href="/">
          Return to Dashboard
        </a>
      </div>
    </CourseStyles>
  );
}

function CourseAssignments(props) {
  const assignmentsInfoQuery = useQuery(["assignments"], async () => {
    return await getAssignments(props.courseNum);
  });

  if (assignmentsInfoQuery.isLoading) {
    return "Loading...";
  }

  if (assignmentsInfoQuery.isError) {
    return "There was an error getting course info.";
  }

  return (
    <CourseAssignmentStyles>
      <Nav />
      <div className="assignmentsContainer">
        {assignmentsInfoQuery.data.length > 0
          ? assignmentsInfoQuery.data.map((p) => (
              <Assignment
                className="assignment"
                key={p.assignmentID}
                title={p.assignment_title}
                description={p.assignment_desc}
                courseNum={p.course_number}
                dueDate={p.due_date}
                submissionType={p.submission_type}
              />
            ))
          : <div className="noAssignmentsText">This course has no assignments</div>}
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
}) {
  return (
    <AssignmentStyles>
      <div className="assignmentCard">
        <h2>{title}</h2>
        <div className="cardHeader">
          <div><strong>Course Number: </strong> {courseNum}</div>
          <div><strong>Due Date: </strong>{dueDate}</div>
        </div>
        <div><strong>Description:</strong></div>
        <div>{description}</div>
        <div><strong>Submission Type: </strong>{submissionType}</div>
      </div>
    </AssignmentStyles>
  );
}
