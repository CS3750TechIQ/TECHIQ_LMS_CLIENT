import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";

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

`;

export default function AddCourses() {
    return(
        <AddCoursesStyles>
            <Nav /> 
            <form>
                <div className="addFormContainer">
                    <div className="addButtonItem">
                        <h1 className="addHeading" >Create Class</h1>
                    </div>                
                    <div className="addFormItems">
                        <label className="addCoursesLabel" for="number">Department: </label>
                        <input className="addCoursesLabel" list="departments" name="department"></input>
                        <datalist id="departments">
                            <option value="Computer Science"></option>
                            <option value="Electrical Engineering"></option>
                            <option value="Computer Engineering"></option>
                            <option value="Network Management Technology"></option>
                            <option value="Mechanical Engineering"></option>
                            <option value="Manufacturing Engineering"></option>
                        </datalist>
                    </div>
                    <div className="addFormItems">
                        <label className="addCoursesLabel" for="number">Course number: </label>
                        <input id="number"></input>
                    </div>
                    <div className="addFormItems">
                        <label className="addCoursesLabel" for="name">Course name: </label>
                        <input id="name"></input>
                    </div>
                    <div className="addFormItems">
                        <input className="addCoursesLabel" type="checkbox" id="Monday" ></input>
                        <label className="addCoursesLabel" for="Monday">Monday</label>
                    </div>
                    <div className="addFormItems">
                        <input className="addCoursesLabel" type="checkbox" id="Tuesday" ></input>
                        <label className="addCoursesLabel" for="Tuesday">Tuesday</label>
                    </div>
                    <div className="addFormItems">
                        <input className="addCoursesLabel" type="checkbox" id="Wednesday" ></input>
                        <label className="addCoursesLabel" for="Wednesday">Wednesday</label>
                    </div>
                    <div className="addFormItems">    
                        <input className="addCoursesLabel" type="checkbox" id="Thursday" ></input>
                        <label className="addCoursesLabel" for="Thursday">Thursday</label>
                    </div>
                    <div className="addFormItems">
                        <input className="addCoursesLabel" type="checkbox" id="Friday" ></input>
                        <label className="addCoursesLabel" for="Friday">Friday</label>
                    </div>
                    <div className="addFormItems">
                        <label className="addCoursesLabel" for="stTime" > Start Time: </label>
                        <input className="addCoursesLabel" type="time" id="stTime" name="stTime"></input>
                    </div>
                    <div className="addFormItems">
                        <label className="addCoursesLabel" for="edTime" > End Time: </label>
                        <input className="addCoursesLabel" type="time" id="edTime" name="edTime"></input>
                    </div>  
                    <div className="addFormItems">
                        <label className="addCoursesLabel" for="capacity">Max. capacity</label>
                        <input id="capacity"></input>
                    </div>    
                    <div className="addButtonItem">
                        <input className="courseButton" type="submit" value="Create"></input>
                        <a className="courseReturn" href="/courses"> Return to courses</a>
                    </div>
                </div>
            </form>


        </AddCoursesStyles>

    );
}
