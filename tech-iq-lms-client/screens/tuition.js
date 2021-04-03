import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";
import { useQuery } from "react-query";
import axios from "axios";
import { useUser } from "../hooks/useUser";

const TuitionStyles = styled.div`
  .tuitionContainer {
    display: flex;
    flex-direction: column;
    justify-content: right;
    padding: 2rem;
    width: 750px;
    margin: auto;
    margin-top: 50px;
    border-radius: 4px;
    box-shadow: 0.25px 0.25px 3px #a0a0a0;
  }

  .tuitionTotalContainer {
    display: flex;
    margin: auto;
  }

  .paymentButton {
    display: flex;
    width: 150px;
    padding: 3px;
    margin: auto;
  }

  .inputBox {
    display: flex;
    width: 300px;
  }

  .inputLabelitems {
    display: flex;
    margin: 3px;
    padding: 3px;
  }
`;

const getTuition = async (studentID) => {
  return await axios
    .get("http://localhost:50058/Account/" + studentID + "/getTuition")
    .then((res) => res.data);
};

export default function tuition() {
    const [user] = useUser();
  const tuitionInfoQuery = useQuery(["tuition", user?.studentId], async () => {
    return await getTuition(user?.studentId);
  }, {
      enabled: !!user?.studentId
  });

  if (tuitionInfoQuery.isLoading) {
    return "Loading...";
  }

  if (tuitionInfoQuery.isError) {
    return "There was an error getting course info.";
  }

  return (
    <TuitionStyles>
      <Nav />
      <div className="tuitionContainer">
        <p className="tuitionTotalContainer">Amount owed: {tuitionInfoQuery?.data.tuition}</p>
        <div className="inputLabelitems">
          <label>Name on card: </label>
          <input className="inputBox" type="text" />
        </div>
        <div className="inputLabelitems">
          <label>Credit card number: </label>
          <input className="inputBox" type="text" />
        </div>
        <div className="inputLabelitems">
          <label>Expiration date: </label>
          <input className="inputBox" type="date" />
        </div>
        <div className="inputLabelitems">
          <label>CVC Number: </label>
          <input className="inputBox" type="text" />
        </div>
        <div className="inputLabelitems">
          <label>Payment amount: </label>
          <input className="inputBox" type="text" />
        </div>
        <div className="inputLabelitems">
          <label>Memo: </label>
          <input className="inputBox" type="text" />
        </div>
        <div className="paymentButton">
          <button>Submit payment</button>
        </div>
      </div>
    </TuitionStyles>
  );
}
