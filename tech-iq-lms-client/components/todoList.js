import styled from "styled-components";
import { useQuery } from "react-query";
import { useUser } from "../hooks/useUser";
import axios from "axios";

const TodoListStyles = styled.div`
  h3 {
    margin: 2px 0px 2px 0px;
    color: black;
  }
  .divContainer {
    margin: 8px;
    color: black;
  }
  .listContainer {
    border: 2px solid gray;
    color: gray;
    max-height: 250px;
    overflow-y: auto;
    border-radius: 5px;
  }
  .labelMain {
    font-weight: bold;
  }
  .labelSub {
    color: black;
  }
`;

const TodoItemStyles = styled.div``;

const fetchAllAssignments = async (username) => {
  return await axios
    .get(
      "http://localhost:50058/Account/" +
        username +
        "/getAllRegisteredCoursesAssignments"
    )
    .then((res) => {
      while(res.data.length > 5){
        res.data.pop()
      }
      return res.data
    });
};

export default function List() {
  const [user, setUser] = useUser();
  const assignmentsListQuery = useQuery(
    ["assignmentList", user?.username],
    async () => {
      return await fetchAllAssignments(user?.username);
    }
  );

  if (assignmentsListQuery.isLoading) {
    return "Loading....";
  }

  if (assignmentsListQuery.isError) {
    return "Something went wrong while fetching your to do list";
  }

  return (
    <TodoListStyles className="listContainer">
      <h3>To-Do List: </h3>
      <div className="listContainer">
        {assignmentsListQuery.data.length > 0
          ? assignmentsListQuery.data.map((p) => (
              <ToDoItem
                courseNumber={p.course_number}
                assignmentName={p.assignment_title}
                dueDate={p.due_date}
              />
            ))
          : null}
      </div>
    </TodoListStyles>
  );
}

function ToDoItem({ courseNumber, assignmentName, dueDate }) {
  return (
    <TodoItemStyles>
      <h3>{courseNumber}</h3>
      <div>Assignment: {assignmentName}</div>
      <div>Due: {dueDate}</div>
    </TodoItemStyles>
  );
}
