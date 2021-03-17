import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";

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

    td{

    }
`;

export default function RegisterCourses() {
    return(
        <RegisterCoursesStyles>
            <Nav /> 
            <div className="addCourseContainer">
                <h1 className="courseTitle">Register Courses</h1>
                <div className="courseListContainer">
                    <table>
                        <tr>
                            <th>Course subject</th>
                            <th>Course number</th>
                            <th>Course name</th>
                            <th>Meeting time</th>
                            <th>Location</th>
                            <th>Days</th>
                            <th>Max. capacity</th>
                            <th>  </th>
                        </tr>
                        <tr>
                                <td>CS</td>
                                <td>3550</td>
                                <td>Adv. Database</td>
                                <td>11:30 - 1:30</td>
                                <td>Online</td>
                                <td>MW</td>
                                <td>50</td>
                                <td className="courseListButtonsP">
                                    <button type="button" className="courseListButtonsE">Add Class</button>                                   
                                </td>
                            </tr>
                    </table>
                </div>
                <a className="courseTitle courseReturn" href="/registration">Return to Registration</a>
            </div>
        </RegisterCoursesStyles>
    );
}