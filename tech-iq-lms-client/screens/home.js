import React, { useState, Component } from 'react';
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useQueryClien, useQuery } from "react-query";
import axios from "axios";
import Nav from "../components/navBar";
import Button from "../components/button";
import List from "../components/todolist";
import CourseCards from "../components/courseCards";
import useLocalStorage from '../hooks/useLocalStorage';



const HomeStyles = styled.div`
  .rightSideBar {
    position: absolute;
    display: flex;
    top: 68px;
    right: 0;
    width: 20%;
    padding: 1rem;
    height: 100%;
    border-left: 1px solid #58CCED;
  }

  .courseCardLayout {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    width: 70%;
    justify-content: space-between;
  }
`;


export default function Home(props) {

  const localUserData = useLocalStorage('user')

  return (
    <HomeStyles>
      <Nav userType={localUserData[0].userType}/>
      <div className="rightSideBar">
        <List />
      </div>
      <div className="courseCardLayout">
        <CourseCards />
        <CourseCards />
        <CourseCards />
        <CourseCards />
      </div>
    </HomeStyles>
  )
}
