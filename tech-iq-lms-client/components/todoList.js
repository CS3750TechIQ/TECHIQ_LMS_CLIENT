import styled from "styled-components";

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

export default function List() {
  return (
    <TodoListStyles class="listContainer">
      <h3>To-Do List: </h3>
      <div class="listContainer">
        <div class="divContainer">
          <label class="labelMain"> CS 3750 </label>
          <div>
            <div>
              <label class="labelSub">Assignment: </label>
              <span> Todo List </span>
            </div>
            <label class="labelSub"> Due: </label>
            <span> Sunday, February 28 2021</span>
          </div>
        </div>

        <div class="divContainer">
          <label class="labelMain"> CS 3100 </label>
          <div>
            <div>
              <label class="labelSub">Assignment: </label>
              <span> Todo List </span>
            </div>
            <label class="labelSub"> Due: </label>
            <span> Sunday, February 28 2021</span>
          </div>
        </div>

        <div class="divContainer">
          <label class="labelMain"> CS 3270 </label>
          <div>
            <div>
              <label class="labelSub">Assignment: </label>
              <span> Todo List </span>
            </div>
            <label class="labelSub"> Due: </label>
            <span> Sunday, February 28 2021</span>
          </div>
        </div>

        <div class="divContainer">
          <label class="labelMain"> CS 3280 </label>
          <div>
            <div>
              <label class="labelSub">Assignment: </label>
              <span> Todo List </span>
            </div>
            <label class="labelSub"> Due: </label>
            <span> Sunday, February 28 2021</span>
          </div>
        </div>

        <div class="divContainer">
          <label class="labelMain"> CS 4110 </label>
          <div>
            <div>
              <label class="labelSub">Assignment: </label>
              <span> Todo List </span>
            </div>
            <label> Due: </label>
            <span class="labelSub"> Sunday, February 28 2021</span>
          </div>
        </div>
      </div>
    </TodoListStyles>
  );
}
