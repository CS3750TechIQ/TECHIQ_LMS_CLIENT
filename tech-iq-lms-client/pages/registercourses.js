import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import axios from 'axios';


const RegisterCoursesStyles = styled.div`
    .addCourseContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: auto;
    }

    .buttonContainerCourse{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        
    }
    .courseListContainer{
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

    .courseReturn {
        font-weight: bold;
    }

    .courseSearch {
        text-align: center;
        color: #072f60;
        margin: 1rem;
    }
    .courseButton {
        background-color: #072f60;
        color: #ffffff;
        margin: 5px;
        padding: 5px;
    }

    .courseButton:hover{
        background-color:#6a829f;
    }
    .courseSearchInput {
        color: #072f60;
        margin: 5px;
        padding: 5px;
    }

    table{       
        border-collapse: collapse;
        width: 80%;
        
    }
    
    th{
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


export default function RegisterCourses() {
    const [filterText, setFilterText] = useState("@")
    const [course, setCourse] = useState([]);
    function getCourses(){
        if(filterText === ""){
            axios.get("http://localhost:50058/Account/@/filtercourse")
            .then(
                (result)=>{
                    setCourse(result.data);
                }
            )
        }else{
            axios.get("http://localhost:50058/Account/" + filterText + "/filtercourse")
            .then(
                (result)=>{
                    setCourse(result.data);
                }
            )
        }

    };

    function addCourse(e){
        console.log("Course added" + e.target.value);
    }

  
    useEffect(async () =>{
        await axios.get("http://localhost:50058/Account/@/filtercourse")
        .then(
            (result)=>{
                setCourse(result.data);
            }
        )
    },[]);

    return(
        <RegisterCoursesStyles>
            <Nav /> 
            <div className="addCourseContainer">
                <h1 className="courseTitle">Register Courses</h1>
                <div className="courseSearch">
                    <input className="courseSearchInput" type="text" placeholder="Search Courses" name="search" onChange={(e) => setFilterText(e.target.value)}></input>
                    <button className="courseButton" type="submit" onClick={getCourses} >Search</button>                  
                </div>
                <div className="courseListContainer">
                    <table>
                        <tr>
                            <th>Department</th>
                            <th>Course number</th>
                            <th>Course name</th>
                            <th>Meeting time</th> {/* Start and end time in DB table */}
                            <th>Location</th>
                            <th>Days</th>
                            <th>Max. capacity</th>
                            <th>First name</th> {/* first and last of professor possible pulled from UserLMS table? */}
                            <th>Last name</th>
                            <th> Register </th>
                        </tr>
                        {course.map(( course ) => {
                            return (
                            <tr>
                                <td>{course.department}</td>
                                <td>{course.course_number}</td>
                                <td>{course.course_name}</td>
                                <td>{course.start_time}</td>
                                <td>{course.location}</td>
                                <td>{course.days}</td>
                                <td>{course.max_capacity}</td>
                                <td>{course.firstName}</td>
                                <td>{course.lastName}</td>
                                <td className="courseListButtonsP">
                                    <button type="button" className="courseListButtonsE" onClick={addCourse}>Add Class</button>                                   
                                </td>
                            </tr>
                            );
                            })} 
                    </table>
                </div>
                <a className="courseTitle courseReturn" href="/registration">Return to Registration</a>  
            </div>
        </RegisterCoursesStyles>
    );
}