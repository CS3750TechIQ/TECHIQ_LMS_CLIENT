import { createContext, useState, useContext } from "react";
import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";
import { useQuery } from "react-query";
import axios from "axios";
import { useUser } from "../hooks/useUser";

const AddCoursesStyles = styled.div`
  .addCoursesLabel {
    color: #072f60;
    margin: 8px;
    padding: 5px;
  }

  .addFormContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 380px;
    margin: 0 auto;
    padding: 5px;
  }

  .addFormItems {
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin: 3px;
    padding: 1px;
  }

  .courseButton {
    background-color: #072f60;
    color: #ffffff;
    margin: 20px;
    padding: 10px;
  }

  .addButtonItem {
    display: flex;
    justify-content: center;
  }

  .addHeading {
    color: #072f60;
  }

  .courseReturn {
    color: #072f60;
    margin: 20px;
    padding: 10px;
    font-weight: bold;
  }

  label {
    font-weight: bold;
  }

  .missingFields {
    color: red;
    text-align: center;
    transform: scale(1);
    animation: pulse 2s infinite;

    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
      }

      70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
      }

      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
      }
    }
  }
`;

export default function addCourse() {
  // create instance of router
  const router = useRouter();

  // Creating state objects that hold the course information
  const [department, setDepartment] = useState("");
  const [course_number, setCourse_Number] = useState("");
  const [course_name, setCourse_Name] = useState("");
  const [start_time, setStart_Time] = useState("");
  const [end_time, setEnd_Time] = useState("");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState([]);
  const [max_capacity, setMax_Capacity] = useState("");
  const [user, setUserData] = useUser();
  const [username, setUsername] = useState(user?.username);
  const [firstname, setFirstname] = useState(user?.firstName);
  const [lastname, setLastname] = useState(user?.lastName);
  const [instructorId, setInstructorId] = useState(user?.instructorid);
  const [credit_hours, setCredit_hours] = useState("");
  const [description, setDescription] = useState("");
  const [blankfields, setBlankfields] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  // function that will send a Post request to the server
  const createCourse = async () => {
    //console.log(userData);
    //#region  input verification
    if (department === null || department === "") {
      setBlankfields(true);
      return;
    }
    if (course_number === null || course_number === "") {
      setBlankfields(true);
      return;
    }
    if (course_name === null || course_name === "") {
      setBlankfields(true);
      return;
    }
    if (start_time === null || start_time === "") {
      setBlankfields(true);
      return;
    }
    if (end_time === null || end_time === "") {
      setBlankfields(true);
      return;
    }
    if (location === null || location === "") {
      setBlankfields(true);
      return;
    }
    if (days === null || days === "") {
      setBlankfields(true);
      return;
    }
    if (max_capacity === null || max_capacity === "") {
      setBlankfields(true);
      return;
    }
    if (username === null || username === "") {
      setBlankfields(true);
      return;
    }
    if (firstname === null || firstname === "") {
      setBlankfields(true);
      return;
    }
    if (lastname === null || lastname === "") {
      setBlankfields(true);
      return;
    }
    if (credit_hours === null || credit_hours === "") {
      setBlankfields(true);
      return;
    }
    if (description === null || description === "") {
      setBlankfields(true);
      return;
    }
    if (departmentId === null || departmentId === "") {
      setBlankfields(true);
      return;
    }

    // verify correct information is sent in console
    console.log(department);
    console.log(course_number);
    console.log(course_name);
    console.log(start_time);
    console.log(end_time);
    console.log(location);
    console.log(days);
    console.log(max_capacity);
    console.log(username);
    console.log(firstname);
    console.log(lastname);
    console.log(credit_hours);
    console.log(description);
    console.log(departmentId);
    console.log(instructorId);
    try {
      const res = await axios.put("http://localhost:50058/Account/AddCourse", {
        department,
        course_number,
        course_name,
        start_time,
        end_time,
        location,
        days,
        max_capacity,
        username,
        firstname,
        lastname,
        credit_hours,
        description,
        departmentId,
        instructorId,
      });
      if (res.status === 200) router.reload();
    } catch (e) {
      alert(e);
    }
  };
  return (
    <AddCoursesStyles>
      <Nav />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCourse();
        }}
      >
        <div className="addFormContainer">
          <div className="addButtonItem">
            <h1 className="addHeading">Create Class</h1>
          </div>
          <div className="addFormItems">
            <label className="addCoursesLabel" for="number">
              Department:{" "}
            </label>

            <select
              id="departments"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Choose department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Network Management Technology">
                Network Management Technology
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Manufacturing Engineering">
                Manufacturing Engineering
              </option>
            </select>
          </div>
          <div className="addFormItems">
            <label className="addCoursesLabel" for="number">
              Course number:{" "}
            </label>
            <input
              id="number"
              onChange={(e) => setCourse_Number(e.target.value)}
            ></input>
          </div>
          <div className="addFormItems">
            <label className="addCoursesLabel" for="name">
              Course name:{" "}
            </label>
            <input
              id="name"
              onChange={(e) => setCourse_Name(e.target.value)}
            ></input>
          </div>
          <div className="addFormItems">
            <input
              className="addCoursesLabel"
              type="checkbox"
              id="Monday"
              onChange={() => {
                setDays([...days, "M"]);
              }}
            ></input>
            <label className="addCoursesLabel" for="Monday">
              Monday
            </label>
          </div>
          <div className="addFormItems">
            <input
              className="addCoursesLabel"
              type="checkbox"
              id="Tuesday"
              onChange={() => {
                setDays([...days, "T"]);
              }}
            ></input>
            <label className="addCoursesLabel" for="Tuesday">
              Tuesday
            </label>
          </div>
          <div className="addFormItems">
            <input
              className="addCoursesLabel"
              type="checkbox"
              id="Wednesday"
              onChange={() => {
                setDays([...days, "W"]);
              }}
            ></input>
            <label className="addCoursesLabel" for="Wednesday">
              Wednesday
            </label>
          </div>
          <div className="addFormItems">
            <input
              className="addCoursesLabel"
              type="checkbox"
              id="Thursday"
              onChange={() => {
                setDays([...days, "TH"]);
              }}
            ></input>
            <label className="addCoursesLabel" for="Thursday">
              Thursday
            </label>
          </div>
          <div className="addFormItems">
            <input
              className="addCoursesLabel"
              type="checkbox"
              id="Friday"
              onChange={() => {
                setDays([...days, "F"]);
              }}
            ></input>
            <label className="addCoursesLabel" for="Friday">
              Friday
            </label>
          </div>
          <div className="addFormItems">
            <label className="addCoursesLabel" for="stTime">
              {" "}
              Start Time:{" "}
            </label>
            <input
              className="addCoursesLabel"
              type="time"
              id="stTime"
              name="stTime"
              onChange={(e) => setStart_Time(e.target.value)}
            ></input>
          </div>
          <div className="addFormItems">
            <label className="addCoursesLabel" for="edTime">
              {" "}
              End Time:{" "}
            </label>
            <input
              className="addCoursesLabel"
              type="time"
              id="edTime"
              name="edTime"
              onChange={(e) => setEnd_Time(e.target.value)}
            ></input>
          </div>
          <div className="addFormItems">
            <label className="addCoursesLabel" for="location">
              {" "}
              Location{" "}
            </label>
            <input
              className="addCoursesLabel"
              id="location"
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </div>
          <div className="addFormItems">
            <label className="addCoursesLabel" for="capacity">
              Max. capacity
            </label>
            <input
              id="capacity"
              onChange={(e) => setMax_Capacity(e.target.value)}
            ></input>
          </div>
          <div className="addFormItems">
            <label className="addCoursesLabel" for="credit_hours">
              Credit hours
            </label>
            <input
              id="credit_hours"
              onChange={(e) => setCredit_hours(e.target.value)}
            ></input>
          </div>
          <div className="addFormItems">
            <label className="addCoursesLabel" for="description">
              Description
            </label>
            <input
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          {/* testing */}
          <div className="addFormItems">
            <label className="addCoursesLabel" for="DepartmentId">
              Department Id
            </label>
            <input
              id="DepartmentId"
              onChange={(e) => setDepartmentId(e.target.value)}
            ></input>
          </div>
          {/* testing */}
          {blankfields === true ? (
            <div className="missingFields">Missing required fields</div>
          ) : null}
          <div className="addButtonItem">
            <button className="courseButton" type="submit" value="Create">
              Create
            </button>
            <a className="courseReturn" href="/courses">
              {" "}
              Return to courses
            </a>
          </div>
        </div>
      </form>
    </AddCoursesStyles>
  );
}
