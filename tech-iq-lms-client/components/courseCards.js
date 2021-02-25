import styled from "styled-components";

const CardStyles = styled.div `


.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 210px;
  height: 350px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}

.courseColor {
  width: 210px;
  height: 100px;
  background-color: #072F5F;
}

.courseName {
  text-align: center;
}

.courseDesc {
  padding: 10px 8px;
}

.viewButton {
  background-color: #072F5F;

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
  display:block;
  cursor: pointer;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

`;

export default function CourseCards() {
  return ( 
    <CardStyles>
    <div class="card">  
      <div class="courseColor"></div>
      <div>
        <h3 class="courseName">Course Name</h3>
        <p class="courseDesc"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed lorem dui. Pellentesque eget ante mauris. </p>
      </div>
      <div class="center" >
        <button class="viewButton courseButton">View</button> 
        <button class="dropButton courseButton">Drop</button>
      </div>
    </div>


    </CardStyles>
  )
}