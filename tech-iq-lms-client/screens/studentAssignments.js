import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocalStorage from "../hooks/useLocalStorage";
import Moment from 'moment';
import RegisterCourses from "./registercourses";
import { Link } from "react-router-dom";
import AssignmentSubmission from '../screens/assignmentSubmission';

const StudentAssignmentsStyles = styled.div`
    .addAssignmentContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: auto;
    }
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
        margin-bottom: 50px;
    }
    .assignmentListContainer {
        display: flex;
        justify-content: center;
    }
    
    .assignmentTitle {
    text-align: center;
    color: #072f60;
    }
`;

const StudentAssignments = ({courseNumber}) => {
    const [assignment, setAssignment] = useState([]);

    // function submitAssignment(value) {
    //     debugger;
    //     <RegisterCourses/>
    //     alert(assignment[value].assignment_title);
    //     console.log(assignment[value]);
    //   }

        useEffect(async () => {
            debugger;
            await axios
            //   .get("http://localhost:50058/Account/" + courseNumber + "/getAssignments")
            .get("http://localhost:50058/Account/4120/getAssignments")
              .then((result) => {
                setAssignment(result.data);
              });
          }, []);

        return(
            <StudentAssignmentsStyles>
            <Nav /> 
            <div className="addAssignmentContainer">
                <div className="assignmentContainer">
                    <h1 className="assignmentTitle">{courseNumber} 4120 Assignments</h1>
                    <div className="assignmentListContainer">
                        <table>
                            <tr>
                                <th>Title</th>
                                <th>Description</th> {/* Start and end time in DB table */}
                                <th>Due Date</th>
                                <th>Max Points</th>
                                <th></th>
                            </tr>
                            {assignment.map(( assignment, index ) => {
                                return (
                                <tr key={index}>
                                    <td>{assignment.assignment_title}</td>
                                    <td>{assignment.assignment_desc}</td>
                                    <td> {Moment(assignment.due_date).format('lll')}</td>
                                    <td>{assignment.max_points}</td>
                                    <td className="">
                                    <Link to="/assignmentSubmission">
                                        <button type="button" className="" onClick={() => <AssignmentSubmission assignment={assignment}/>}>Submit</button>          
                                    </Link>                         
                                    </td>
                                </tr>
                                );
                            })} 
                        </table>    
                    </div>
                </div>
            </div>
            </StudentAssignmentsStyles>
        );
}
export default StudentAssignments;