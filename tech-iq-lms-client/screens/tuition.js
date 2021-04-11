import React, { useState } from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";
import { useMutation, useQuery } from "react-query";
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

  // set state
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpMonth, setCardExpMonth] = useState("");
  const [cardExpYear, setCardExpYear] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const tuitionInfoQuery = useQuery(
    ["tuition", user?.studentId],
    async () => {
      return await getTuition(user?.studentId);
    },
    {
      enabled: !!user?.studentId,
    }
  );

  // mutation function
  const submitPaymentMutation = useMutation(
    async () => {
      console.log(amount);
      console.log(description);
      console.log(cardNumber);
      console.log(cardExpMonth);
      console.log(cardExpYear);
      console.log(cardCVC);
      const { data } = await axios.put(
        "http://localhost:50058/Account/submitPayment",
        {
          amount,
          description,
          cardNumber,
          cardExpMonth,
          cardExpYear,
          cardCVC
        }
      );
      return data;
    },
    {
      // onSuccess ??
    }
  );

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
        <p className="tuitionTotalContainer">
          Amount owed: {tuitionInfoQuery?.data.tuition}
        </p>
        <div className="inputLabelitems">
          <label>Name on card: </label>
          <input
            className="inputBox"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="inputLabelitems">
          <label>Credit card number: </label>
          <input
            className="inputBox"
            type="text"
            onChange={(e) => {
              setCardNumber(e.target.value);
            }}
          />
        </div>
        <div className="inputLabelitems">
          <label>Expiration Month: </label>
          <input
            className="inputBox"
            type="text"
            onChange={(e) => {
              setCardExpMonth(e.target.value);
            }}
          />
        </div>
        <div className="inputLabelitems">
          <label>Expiration Year: </label>
          <input
            className="inputBox"
            type="text"
            onChange={(e) => {
              setCardExpYear(e.target.value);
            }}
          />
        </div>
        <div className="inputLabelitems">
          <label>CVC Number: </label>
          <input
            className="inputBox"
            type="text"
            onChange={(e) => {
              setCardCVC(e.target.value);
            }}
          />
        </div>
        <div className="inputLabelitems">
          <label>Payment amount: </label>
          <input
            className="inputBox"
            type="text"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div className="inputLabelitems">
          <label>Memo: </label>
          <input className="inputBox" type="text" />
        </div>
        <div className="paymentButton">
          <button
            className="submitButton"
            onClick={() => {
              submitPaymentMutation.mutate();
            }}
          >
            Submit payment
          </button>
        </div>
      </div>
    </TuitionStyles>
  );
}
