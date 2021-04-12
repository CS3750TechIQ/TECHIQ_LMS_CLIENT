import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocalStorage from "../hooks/useLocalStorage";

const StudentAssignmentsStyles = styled.div`
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
        tr{
            textalign:center;
        }
`;

export default function StudentAssignments({courseNumber}){
        // useEffect(async () => {
        //     debugger;
        //     await axios
        //       .get("http://localhost:50058/Account/" + courseNumber + "/getAssignments")
        //       .then((result) => {
        //         debugger;
        //         setCourse(result.data);
        //       });
        //   }, []);

        return(
            <StudentAssignmentsStyles>
            <Nav /> 

            <div className="assignmentContainer">
                <h1 className="courseTitle">{courseNumber} Assignments</h1>
                <div className="courseSearch">
                    {/* <input className="courseSearchInput" type="text" placeholder="Search Courses" name="search" onChange={(e) => setFilterText(e.target.value)}></input> */}
                    {/* <button className="courseButton" type="submit" onClick={getCourses} >Search</button>                   */}
                </div>
                <div className="courseListContainer">
                    <table>
                        <tr>
                            <th>Course number</th>
                            <th>Course name</th>
                            <th>Meeting time</th> {/* Start and end time in DB table */}
                            <th>Location</th>
                            <th>Days</th>
                            <th>Max. capacity</th>
                            <th>Credit Hours</th>
                            <th>Instructor</th> {/* first and last of professor possible pulled from UserLMS table? */}
                            <th> Add </th>
                            <th> Remove </th>
                        </tr>
                        {/* {course.map(( course, index ) => {
                            return (
                            <tr key={index}>
                                <td>{course.departmentName}</td>
                                <td>{course.course_number}</td>
                                <td>{course.course_name}</td>
                                <td>{course.start_time}</td>
                                <td>{course.location}</td>
                                <td>{course.days}</td>
                                <td>{course.max_capacity}</td>
                                <td>{course.credit_hours}</td>
                                <td>{course.firstName} {course.lastName}</td>
                                <td className="courseListButtonsP">
                                    <button type="button" className="courseListButtonsE" onClick={() => addCourse(index,this)}><FontAwesomeIcon icon= "plus" size="xl"/></button>                                   
                                </td>
                                <td className="courseListButtonsP">
                                    <button type="button" className="btnRemoveCourse" onClick={() => removeCourse(index)}><FontAwesomeIcon icon= "minus" size="xl"/></button>                                   
                                </td>
                            </tr>
                            );
                            })}  */}
                    </table>    
                </div>
                <div className="courseListContainer">
                    {/* <table className = "regCourseContainer">
                        {regCourse.map(( regCourse, index ) => {
                            return (
                                <tr key={index}>
                                    {/* <td>{regCourse.department}</td> */}
                                    {/* <td>{regCourse.course_number}</td>
                                    <td>{regCourse.course_name}</td>
                                    <td>{regCourse.start_time}</td>
                                    <td>{regCourse.location}</td>
                                    <td>{regCourse.days}</td>
                                    <td>{regCourse.max_capacity}</td>
                                    <td>{regCourse.firstName}</td>
                                    <td>{regCourse.lastName}</td> 
                                </tr>
                                );
                            })}  */}
                    {/* </table>    */}

                </div>
                    <div className="registerBtnContainer">
                      {/* <button className="registerBtn" onClick={() => registerCourseMutation.mutate()} disabled={regCourse.length <= 0}>Register</button> */}
                    </div> 
                    {/* /<a className="courseTitle courseReturn" href="/registration">Return to Registration</a>   */}

            </div>
            </StudentAssignmentsStyles>
        );
}
