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

const AssignmentSubmissionStyles = styled.div`
   
`;

const AssignmentSubmission = ({assignment}) => {
      
        return(
            <AssignmentSubmissionStyles>
            <Nav /> 
            <label>Text</label>
            <label>assignment</label>
            <div>{assignment}</div>
            </AssignmentSubmissionStyles>
        );
}
export default AssignmentSubmission;