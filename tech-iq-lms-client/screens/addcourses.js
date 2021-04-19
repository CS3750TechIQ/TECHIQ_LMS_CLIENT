import { createContext, useState, useContext } from "react";
import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useUser } from "../hooks/useUser";

const AddCoursesStyles = styled.div`
  .addCourseContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #f3f2ee;
    padding: 1rem;
    width: 50rem;
    margin: auto;
  }

  .addCoursesLabel {
    color: #072f60;
    margin: 8px;
    padding: 5px;
  }

  .addFormContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    margin: 0 auto;
    padding: 8px;
  }

  .addFormItems {
    display: flex;
    flex-direction: row;
    justify-content: left;
    flex-grow: 2;
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

  .addDescription {
    height: 80px;
    width: 210px;
  }

  .addDrop {
    width: 210px;
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
  //const router = useRouter();
  const [user] = useUser();

  // Creating state objects that hold the course information
  const [course_number, setCourse_Number] = useState("");
  const [course_name, setCourse_Name] = useState("");
  const [start_time, setStart_Time] = useState("");
  const [end_time, setEnd_Time] = useState("");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [max_capacity, setMax_Capacity] = useState("");

  //const [username, setUsername] = useState(user?.username);
  //const [firstname, setFirstname] = useState(user?.firstName);
  //const [lastname, setLastname] = useState(user?.lastName);
  const [InstructorId] = useState(user?.instructorid);
  const [credit_hours, setCredit_hours] = useState("");
  const [description, setDescription] = useState("");
  const [blankfields, setBlankfields] = useState("");
  const [DepartmentId, setDepartmentId] = useState("");

  // function that will send a Post request to the server

  // verify correct information is sent in console
  const addCourse = () => {
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
    if (credit_hours === null || credit_hours === "") {
      setBlankfields(true);
      return;
    }
    if (description === null || description === "") {
      setBlankfields(true);
      return;
    }
    if (DepartmentId === null || DepartmentId === "") {
      setBlankfields(true);
      return;
    }
    createCourse.mutate()
  }
  const createCourse = useMutation(
    async () => {
      const { data } = await axios.put(
        "http://localhost:50058/Account/AddCourse",
        {
          course_number,
          course_name,
          start_time,
          end_time,
          location,
          days,
          max_capacity,
          credit_hours,
          description,
          InstructorId,
          DepartmentId,
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        alert("Add course successful.");
      },
      onError: (err) => {
        alert("Error adding course.");
      },
    }
  );

  return (
    <AddCoursesStyles>
      <Nav />
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          createCourse.mutate();
        }}
      > */}
      <div className="addButtonItem">
        <h1 className="addHeading">Create Class</h1>
      </div>
      <div className="addCourseContainer">
        <div className="addFormContainer">
          <div className="addFormItems">
            <label className="addCoursesLabel" for="departments">
              Department:{" "}
            </label>

            <select
              className="addDrop"
              id="departments"
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value="">Choose department</option>
              <option value="1">Computer Science</option>
              <option value="2">Electrical Engineering</option>
              <option value="3">Computer Engineering</option>
              <option value="4">Network Mngmt Technology</option>
              <option value="5">Mechanical Engineering</option>
              <option value="6">Manufacturing Engineering</option>
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
                setDays(days + "M");
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
                setDays(days + "T");
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
                setDays(days + "W");
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
                setDays(days + "TH");
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
                setDays(days + "F");
              }}
            ></input>
            <label className="addCoursesLabel" for="Friday">
              Friday
            </label>
          </div>
        </div>
        <div className="addFormContainer">
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
            <label className="addCoursesLabel " for="description">
              Description
            </label>
            <input
              className="addDescription"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          {blankfields === true ? (
            <div className="missingFields">Missing required fields</div>
          ) : null}
          <div className="addButtonItem">
            <button
              className="courseButton"
              value="Create"
              onClick={() => {
                addCourse();
              }}
            >
              Create
            </button>
            <a className="courseReturn" href="/courses">
              {" "}
              Return to courses
            </a>
          </div>
        </div>
      </div>
      {/* </form> */}
    </AddCoursesStyles>
  );
}
