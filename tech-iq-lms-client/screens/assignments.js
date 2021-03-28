import { createContext, useState, useContext } from "react";
import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";
import { useQuery } from "react-query";

const AddAssignmentStyle = styled.div`
  .addAssignmentLabel {
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

  .assignmentButton {
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

  .assignmentReturn {
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

export default function addAssignment() {

    //create instance of router
    const router = useRouter();

    // Creating state objects that hold the assignment information
    //??? Not setting course number b/c that is a FK from courses ???
    const [assignment_ID, setAssignment_ID] = useState("");
    const [assignment_title, setAssigment_Title] = useState("");
    const [assignment_desc, setAssignment_Desc] = useState("");
    const [due_date, setDue_Date] = useState("");
    const [max_points, setMax_points] = useState("");
    const [submission_type, setSubmission_type] = useState("");
    const [blankfields, setBlankfields] = useState("";)

    // function that will send a P0st request to the server
    const createAssignment = async () => {
        console.log(userData);

        //#region input verification
        if(assignment_ID === null || assignment_ID === ""){
            setBlankfields(true);
            return;
        }
        if(assignment_title === null || assignment_title === ""){
            setBlankfields(true);
            return;
        }
        if(assignment_desc === null || assignment_desc === ""){
            setBlankfields(true);
            return;
        }
        if(due_date === null || due_date === ""){
            setBlankfields(true);
            return;
        }
        if(max_points === null || max_points === ""){
            setBlankfields(true);
            return;
        }
        if(submission_type === null || submission_type === ""){
            setBlankfields(true);
            return;
        }

        try {
            const res = await axios.put("http://localhost:50058/Account/AddAssignment", {
                assignment_ID,
                assignment_title,
                assignment_desc,
                due_date,
                max_points,
                submission_type,
            });
            if (res.status === 200) router.reload();
        }catch (e) {
            alert(e);
        }
    };
    return (
        <AddAssignmentStyle>
            <Nav/>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createAssignment();    
                }}  
            >
                <div className="addFormContainer">
                    <div className="addFormItems">
                      <label className="addAssignmentLabel" for="number">
                        Assignment ID: {" "}
                      </label>
                      <input className="addAssignmentLabel"
                          id="number"
                          onChange={(e) => setAssignment_ID(e.target.value)}
                          ></input>
                    </div>
                    <div className="addFormItems">
                      <label className="addAssignmentLabel" for="title">
                        Assignment Title: {" "}
                      </label>
                      <input className="addAssignmentLabel"
                          id="title"
                          onChange={(e) => setAssignment_Title(e.target.value)}
                          ></input>
                    </div>
                    <div className="addFormItems">
                      <label className="addAssignmentLabel" for="desc">
                        Assignment Description: {" "}
                      </label>
                      <input className="addAssignmentLabel"
                          id="desc"
                          onChange={(e) => setAssignment_Desc(e.target.value)}
                          ></input>
                    </div>
                    <div className="addFormItems">
                      <label className="addAssignmentLabel" for="due_date">
                        Due Date: {" "}
                      </label>
                      <input className="addAssignmentLabel"
                          type = "Date"  
                          id="due_date"
                          onChange={(e) => setDue_Date(e.target.value)}
                          ></input>
                    </div>
                    <div className="addFormItems">
                      <label className="addAssignmentLabel" for="max_points">
                        Due Date: {" "}
                      </label>
                      <input className="addAssignmentLabel"
                          id="max_points"
                          onChange={(e) => setMax_points(e.target.value)}
                          ></input>
                    </div>
                    <div className="addFormItems">
                        <label className="addAssignmentLabel" for="sub_type">
                            Submission Type: {" "}
                        </label>

                        <select
                            id="sub_type"
                            onChange={(e) => setSubmission_type(e.target.value)}
                        >
                            <option value="File Submission">File Submission</option>
                            <option value="Text Entry">Text Entry</option>
                        </select>
                    </div>

                    {blankfields === true ? (
                        <div className="missingFields">Missing required fields</div>
                    ) : null}
                    <div className="addButtonItem">
                        <button className="assignmentButton" type="submit">
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </AddAssignmentStyle>
    );

}