import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";

const RegistrationStyles = styled.div`

    .addCourseContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: auto;
    }

    .courseTitle {
        text-align: center;
        color: #072f60;
    }

    .courseListContainer{
        display: flex;
        justify-content: center;
    }

    .buttonContainerCourse{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly; 
    }

    .courseButton {
        background-color: #072f60;
        color: #ffffff;
        margin: 5px;
        padding: 5px;
    }

    .courseReturn {
        font-weight: bold;
    }
`;

export default function Registration() {
    return(
        <RegistrationStyles>
            <Nav />
            <div className="addCourseContainer">
                <h1 className="courseTitle">Registered Classes</h1>

                <div className="buttonContainerCourse">
                    <form action="/registercourses">
                            <button type="submit" className="courseButton" >Register classes</button>
                    </form>
                </div>

                <div className="courseListContainer">
                    <h1>*** This will pull from the /regiseredCoursesAPI ***</h1>
                </div>


                <a className="courseTitle courseReturn" href="/">Return to Dashboard</a>
            </div>

        </RegistrationStyles>
    );
}