import styled from 'styled-components';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

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
    padding: 1rem;

    a {
      padding: 1rem;
    }

    a:hover {
      color: #58cced;
    }
  }
`;

export default function Nav() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('userData')
  const [userType, setUserType] = useState(data.data.userType);
  return (
    <NavStyles>
      <div className="navContainer">
        <div className="title">
          <a href="/">Canvas</a>
        </div>
        <div className="pageLinks">
          <a href="/account">Account</a>
          <a href="/dashboard">Dashboard</a>
          {
            userType ==='Instructor' ? 
            <a href="/courses">Courses</a> : 
            <a href="/registration">Registration</a>
          }
          <a href="/calendar">Calendar</a>
        </div>
      </div>
    </NavStyles>
  );
}
