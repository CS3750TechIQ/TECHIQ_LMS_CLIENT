import React from "react";
import { Link } from 'react-router-dom'
import Nav from "../components/navBar";
import styled from "styled-components";
import { useRouter } from "next/router";
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
export default function Courses() {
  const localUserData = useLocalStorage("user");
  const router = useRouter();
  
  const handleClick = e => {
    e.preventDefault()
    router.push('/instructorCourse')
  }

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
              <td className="courseListButtonsP">
                <Link to="/instructorCourse">
                <a>Details</a>
                </Link>
                <button className="courseListButtonsE">Edit</button>
                <button className="courseListButtonsD">Delete</button>
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
                <button className="detailsButton">Details</button>
                <button type="button" className="courseListButtonsE">
                  Edit
                </button>
                <button type="button" className="courseListButtonsD">
                  Delete
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
