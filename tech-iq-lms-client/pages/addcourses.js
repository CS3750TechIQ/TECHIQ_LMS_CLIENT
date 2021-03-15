import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";

const AddCoursesStyles = styled.div`
    .addCoursesLabel {
        color: #072f60;
    }

    .addFormContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 350px;
        margin: 0 auto;
        padding: 5px;

    }

    .addFormItems {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin: 8px;
        padding: 5px;
    }

    


`;

export default function AddCourses() {
    return(
        <AddCoursesStyles>
            <Nav /> 
            <form>
                <div className="addFormContainer">
                    <div className="addFormItems">
                        <label className="addCoursesLabel" for="subject">Course subject: </label>
                        <input id="subject"></input>
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
                        <input type="checkbox" id="Monday" ></input>
                        <label for="Monday">Monday</label>
                    </div>
                    <div className="addFormItems">
                        <input type="checkbox" id="Tuesday" ></input>
                        <label for="Tuesday">Tuesday</label>
                    </div>
                    <div className="addFormItems">
                        <input type="checkbox" id="Wednesday" ></input>
                        <label for="Wednesday">Wednesday</label>
                    </div>
                    <div className="addFormItems">    
                        <input type="checkbox" id="Thursday" ></input>
                        <label for="Thursday">Thursday</label>
                    </div>
                    <div className="addFormItems">
                        <input type="checkbox" id="Friday" ></input>
                        <label for="Friday">Friday</label>
                    </div>
                    <div className="addFormItems">
                        <label for="stTime" > Start Time: </label>
                        <input type="time" id="stTime" name="stTime"></input>
                    </div>
                    <div className="addFormItems">
                        <label for="edTime" > End Time: </label>
                        <input type="time" id="edTime" name="edTime"></input>
                    </div>  
                    <div className="addFormItems">
                        <label className="addCoursesLabel" for="capacity">Max. capacity</label>
                        <input id="name"></input>
                    </div>
                    <div className="addFormItems">
                        <input type="submit" value="Submit"></input>
                    </div>
                </div>
            </form>


        </AddCoursesStyles>

    );
}
