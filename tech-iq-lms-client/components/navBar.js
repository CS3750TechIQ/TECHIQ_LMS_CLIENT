import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Router from 'next/router';
import { useState } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import useLocalStorage from '../hooks/useLocalStorage';

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

    a, div {
      padding: 1rem;
    }

    a:hover, div:hover {
      color: #58cced;
    }
  }
`;

export default function Nav({userType}) {
  const userData = useLocalStorage('user')
  return (
    <NavStyles>
      <div className="navContainer">
        <div className="title">
          <Link to="/">
            <a>Canvas</a>
          </Link>
        </div>
        <div className="pageLinks">
          <Link to="/account">
            <a>Account</a>
          </Link>
          <Link to="/dashboard">
            <a>Dashboard</a>
          </Link>
          {
            userType === 'Instructor' ? 
            <Link to="/courses">
              <a>Courses</a> 
            </Link> :
            <Link to="/registration">
              <a>Registration</a>
            </Link>
          }
          <Link to="/calendar">
            <a>Calendar</a>
          </Link>
          <Link to='/'>
            <a onClick={() => {useLocalStorage('user', null)}}>Logout</a>
          </Link>
        </div>
      </div>
    </NavStyles>
  );
}
