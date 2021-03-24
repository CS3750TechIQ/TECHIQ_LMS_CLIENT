import styled from 'styled-components'
import BellIcon from 'react-bell-icon'
import { useQueryClient } from 'react-query'

const CardStyles = styled.div`
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 250px;
    height: 340px;
    border-radius: 5px;
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
  }

  .dropButton {
    background-color: #e3122e;
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

const CourseCards = ({title, description}) => {
  return (
    <CardStyles>
      <div className="card">
        <div className="courseColor" />
        <div>
          <h3 className="courseName">{title}</h3>
          <p className="courseDesc">
            {' '}
            {description}
          </p>
        </div>
        <div className="center">
          <a href="/notifications">
            <BellIcon color="#072F5F" width="25" />
          </a>
          <button type="button" className="viewButton courseButton">View</button>
          <button type="button" className="dropButton courseButton">Drop</button>
        </div>
      </div>
    </CardStyles>
  );
}

export default CourseCards;
