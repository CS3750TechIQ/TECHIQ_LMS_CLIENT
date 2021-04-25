import React, { useState, Component } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useQueryClient, useQuery } from "react-query";
import axios from "axios";
import Nav from "../components/navBar";
import Button from "../components/button";
import List from "../components/todolist";
import CourseCards from "../components/courseCards";
import { useUser } from "../hooks/useUser";

const HomeStyles = styled.div`
  .rightSideBar {
    position: absolute;
    display: flex;
    top: 82px;
    right: 0;
    width: 20%;
    padding: 1rem;
    height: 100%;
    border-left: 1px solid #58cced;
  }

  .courseCardLayoutStudent {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    width: 70%;
    justify-content: space-between;
  }

  .courseCardLayoutInstructor {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    width: 95%;
    justify-content: space-between;
  }
`;

const getStudentInfo = async (username) => {
  return await axios
    .get("http://localhost:50058/Account/" + username + "/getRegisteredCourses")
    .then((res) => res.data);
};

const getInstructorInfo = async (instructorId) => {
  return await axios
    .get(
      "http://localhost:50058/Account/" + instructorId + "/getInstructorCourses"
    )
    .then((res) => res.data);
};

export default function Home() {
  const [user, setUser] = useUser();

  const userInfoQuery = useQuery(
    ["userInfo", user?.username],
    async () => {
      if (user?.userType === "Student")
        return await getStudentInfo(user?.username);
      else {
        console.log(user?.instructorId);
        return await getInstructorInfo(user?.instructorid);
      }
    },
    {
      enabled: !!user?.username,
    }
  );

  if (userInfoQuery.isLoading) {
    return "Loading...";
  }

  if (userInfoQuery.isError) {
    return "There was an error getting user info.";
  }

  return (
    <HomeStyles>
      <Nav />
      {user?.userType === "Student" ? (
        <div>
          <div className="rightSideBar">
            <List />
          </div>
          <div className="courseCardLayoutStudent">
            {userInfoQuery.data.length > 0
              ? userInfoQuery.data.map((p) => (
                  <CourseCards
                    number={p.course_number}
                    title={p.course_name}
                    description={p.description}
                  />
                ))
              : null}
          </div>
        </div>
      ) : (
        <div className="courseCardLayoutInstructor">
          {userInfoQuery.data.length > 0
            ? userInfoQuery.data.map((p) => (
                <CourseCards
                  number={p.course_number}
                  title={p.course_name}
                  description={p.description}
                />
              ))
            : null}
        </div>
      )}
    </HomeStyles>
  );
}
