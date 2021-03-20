import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
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

export default function Nav() {
  const queryClient = useQueryClient();
  const userData = useLocalStorage('user')

  return (
    <NavStyles>
      <div className="navContainer">
        <div className="title">
          <Link href="/">
            <a>Canvas</a>
          </Link>
        </div>
        <div className="pageLinks">
          <Link href="/account">
            <a>Account</a>
          </Link>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
          {
            userData.userType ==='Instructor' ? 
            <Link href="/courses">
              <a>Courses</a> 
            </Link> :
            <Link href="/registration">
              <a>Registration</a>
            </Link>
          }
          <Link href="/calendar">
            <a>Calendar</a>
          </Link>
          <Link href='/'>
            <a onClick={() => {useLocalStorage('user', null)}}>Logout</a>
          </Link>
        </div>
      </div>
    </NavStyles>
  );
}
