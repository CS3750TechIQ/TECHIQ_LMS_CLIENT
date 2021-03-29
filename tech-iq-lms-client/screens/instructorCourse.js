import styled from "styled-components";
import Nav from "../components/navBar";
import { useQuery } from "react-query"

const InstructorCourseStyles = styled.div``;

const getAssignments = async (courseNum) => {
  return await axios
    .get("http://localhost:50058/Account/" + courseNum + "/getAssignments")
    .then((res) => res.data);
};

export default function InstructorCourse() {
  const userInfoQuery = useQuery(
    ["courseAssignments"],
    async () => {
      return await getAssignments(4120);
    }
  );

  if (userInfoQuery.isLoading) {
    return "Loading...";
  }

  if (userInfoQuery.isError) {
    return "There was an error getting user info.";
  }
  return (
    <InstructorCourseStyles>
      <Nav />
      {userInfoQuery.data.length > 0
        ? userInfoQuery.data.map((p) => (
            <div
              key={p.AssignmentID}
            >
            Assignment: {p.assignment_title}
            description: {p.assignemnt_desc}
            </div>
          ))
        : null}
    </InstructorCourseStyles>
  );
}
