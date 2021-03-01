import styled from "styled-components";


const NavStyles = styled.div`
  a {
    color: inherit;
    text-decoration: none;
  }

  .navContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #072F5F;
    color: white;
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem;
  }

  .pageLinks{
    padding: 1rem;

    a {
      padding: 1rem;
    }

    a:hover {
      color: #58CCED;
    }
  }

`;


export default function Nav(){
  return(
    <NavStyles>
      <div className="navContainer">
        <div className="title">
          <a href='/'>Canvas</a>
        </div>
        <div className="pageLinks">
          <a href="#">Account</a>
          <a href="#">Dashboard</a>
          <a href="#">Courses</a>
          <a href="/calendar">Calendar</a>
        </div>
      </div>
    </NavStyles>
  )
}