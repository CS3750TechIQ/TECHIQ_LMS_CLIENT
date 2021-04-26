import styled from "styled-components";
import { Link } from "react-router-dom";
import BellIcon from "react-bell-icon";
import Router from "next/router";
import { useState } from "react";
import { useQueryClient, useQuery } from "react-query";
import { useUser } from "../hooks/useUser";

const NavStyles = styled.div`
  a {
    color: inherit;
    text-decoration: none;
  }

  .navContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #072f5f;
    color: white;
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem;
  }

  .pageLinks {
    display: flex;
    padding: 1rem;

    a,
    div {
      padding: 1rem;
    }

    a:hover,
    div:hover {
      color: #58cced;
    }
  }
`;

export default function Nav() {
  const [user] = useUser();
  return (
    <NavStyles>
      <div className="navContainer">
        <div className="title">
          <Link to="/">
            <a>Canvas | {user?.username}</a>
          </Link>
        </div>
        <div className="pageLinks">
          <Link to="/account">
            <a>Account</a>
          </Link>
          <Link to="/dashboard">
            <a>Dashboard</a>
          </Link>
          {user.userType === "Instructor" ? (
            <Link to="/courses">
              <a>Courses</a>
            </Link>
          ) : (
            <Link to="/registercourses">
              <a>Registration</a>
            </Link>
          )}
          {user?.userType === "Student" ? (
            <div>
              <Link to="/tuition">
                <a>Tuition</a>
              </Link>
            </div>
          ) : null}
          {user?.userType === "Student" ? (
            <div>
              <Link to="/notifications">
                <a>Notifications</a>
              </Link>
            </div>
          ) : null}
          <Link to="/calendar">
            <a>Calendar</a>
          </Link>
          {
            user.userType == "Student"
            ? ( <Link to="/notifications">
              <a>Notifications</a>
            </Link>
            ) : null
          }
          <Link to="/">
            <a
              onClick={() => {
                useLocalStorage("user", null);
              }}
            >
              Logout
            </a>
          </Link>
        </div>
      </div>
    </NavStyles>
  );
}
