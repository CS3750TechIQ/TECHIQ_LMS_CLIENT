import styled from 'styled-components'
import BellIcon from 'react-bell-icon'
import { useQueryClient } from 'react-query'
import StudentAssignments from '../screens/studentAssignments';
import { Link } from "react-router-dom";

const CardStyles = styled.div`
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 250px;
    height: 340px;
    border-radius: 5px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .courseColor {
    width: 100%;
    height: 95px;
    background-color: #072f5f;
    border-radius: 5px 5px 0px 0px;
  }

  .courseName {
    text-align: center;
    height: 40px;
  }

  .courseDesc {
    padding: 1px 8px;
    height: 90px;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .viewButton {
    background-color: #072f5f;
    border-radius: 3px;
    box-shadow: 0.5px 0.5px 1px #141a18;
  }

  .dropButton {
    background-color: #e3122e;
    border-radius: 3px;
    box-shadow: 0.5px 0.5px 1px #141a18;
  }



  .courseButton {
    padding: 4px 8px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    color: #ffffff;
    display: block;
    cursor: pointer;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CourseCards = ({number,title, description}) => {
  return (
    <CardStyles>
      <div className="card" key={number}>
        <div className="courseColor" />
        <div>
          <h3 className="courseName">{number} | {title}</h3>
          
          <p className="courseDesc">
            {' '}
            {description}
          </p>
        </div>
        <div className="center">
          <a href="/notifications">
            <BellIcon color="#072F5F" width="25" />
          </a>
          
          <Link to="/studentAssignments">
            <button type="button" className="viewButton courseButton" onClick={() => <StudentAssignments courseNumber={number}/>}>View </button>
          </Link>
          <button type="button" className="dropButton courseButton">Drop</button>
        </div>
      </div>
    </CardStyles>
  );
}

export default CourseCards;
