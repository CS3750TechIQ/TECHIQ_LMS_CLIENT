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

const getUserInfo = async (username) => {
  return await axios.get("http://localhost:50058/Account/" + username + "/getUser").then(res => res.data)
}

export default function Home(props) {

  const localUserData = useLocalStorage('user')
  const userInfoQuery = useQuery(['userInfo', localUserData[0].username], async () => {
    const data = await getUserInfo(localUserData[0].username)
    return data
  })

  if (userInfoQuery.isLoading) {
    return 'Loading...'
  }

  if (userInfoQuery.isError) {
    return "There was an error getting user info."
  }  

  return (
    <HomeStyles>
      <Nav userType={userInfoQuery.data.userType}/>
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