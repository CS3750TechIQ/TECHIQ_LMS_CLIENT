import React, { useState } from "react";
import Nav from "../components/navBar";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useUser } from "../hooks/useUser";

const TuitionStyles = styled.div`
  .tuitionContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #072f60;
    padding: 2rem;
    width: 25rem;
    margin: auto;
    margin-top: 50px;
    border-radius: 4px;
    box-shadow: 1px 1px 10px #a0a0a0;
  }

  .tuitionTotalContainer {
    display: flex;
    margin: auto;
    color: #ffffff;
  }

  .paymentButton {
    display: flex;
    width: auto;
    padding: 0.3rem;
    padding-left: 1.2rem;
  }

  .cardImage {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 3px;
    padding: 0px;
  }

  .inputBox {
    border-radius: 4px;
    box-shadow: 1px 1px 5px #141a18;
  }

  .inputLabelitems {
    display: flex;
    flex-direction: row;
    flex=content: space-evenly;
    margin: 3px;
    padding: 0px;
  }

  .exp {
    display: flex;
    flex-direction: column;
    padding: 0.3rem;
  }

  .itemName {
    color: #ffffff;
  }

  .submitButton {
    background-color: #44a04b;
    border-radius: 4px;
    box-shadow: 1px 1px 5px #141a18;
    color: #ffffff;

    :hover {
      background-color: #198521;
    }

    :active {
      background-color: #f3f2ee;
      box-shadow: 0 3px #666;
      transform: translateY(2px);
    }
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
  const [currency, setCurrency] = useState("USD");
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
      const data = await axios.put(
        "http://localhost:50058/Account/submitPayment",
        {
          amount,
          description,
          cardNumber,
          currency,
          cardExpMonth,
          cardExpYear,
          cardCVC,
          studentId: user?.studentId
        }
      )
      return data
    },
    {
      onSuccess: (data) => {
        alert("Payment successful.");
      },
      onError: (err) => {
        alert("Error processing payment.");
      },
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
        <h1 className="tuitionTotalContainer">View/Pay Tuition</h1>
        <div className="inputLabelitems">
          <p className="tuitionTotalContainer">Student:</p>
          <p className="tuitionTotalContainer">
            {user?.firstName} {user?.lastName}
          </p>
        </div>
        <div className="inputLabelitems">
          <p className="tuitionTotalContainer">Tuition amount: </p>
          <p className="tuitionTotalContainer">
            {tuitionInfoQuery?.data.tuition}
          </p>
        </div>
      </div>
      <div className="tuitionContainer">
        <div className="cardImage">
          <a href="http://www.credit-card-logos.com/">
            <img
              alt="Credit Card Logos"
              title="Credit Card Logos"
              src="http://www.credit-card-logos.com/images/multiple_credit-card-logos-1/credit_card_logos_10.gif"
              width="336"
              height="50"
              border="0"
            />
          </a>
        </div>
        <div className="inputLabelitems">
          <div className="exp">
            <label className="itemName">Name on card: </label>
            <input
              className="inputBox"
              type="text"
              size="32"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="exp">
            <label className="itemName">CVC </label>
            <input
              className="inputBox"
              type="text"
              size="3"
              onChange={(e) => {
                setCardCVC(e.target.value);
              }}
              minLength="3"
              maxlength="3"
            />
          </div>
        </div>
        <div className="inputLabelitems">
          <div className="exp">
            <label className="itemName">Card number: </label>
            <input
              className="inputBox"
              type="text"
              size="16"
              onChange={(e) => {
                setCardNumber(e.target.value);
              }}
              minLength="16"
              maxlength="16"
            />
          </div>

          <div className="exp">
            <label className="itemName">Month </label>
            <select
              className="inputDrop"
              onChange={(e) => {
                setCardExpMonth(e.target.value);
              }}
            >
              <option value="">month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div className="exp">
            <label className="itemName">Year </label>
            <select
              className="inputDrop"
              onChange={(e) => {
                setCardExpYear(e.target.value);
              }}
            >
              <option value="">year</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
              <option value="2033">2033</option>
              <option value="2034">2034</option>
              <option value="2035">2035</option>
            </select>
          </div>
        </div>
        <div className="inputLabelitems">
          <div className="exp">
            <label className="itemName">Amount: </label>
            <input
              className="inputBox"
              type="text"
              minLength="11"
              maxlength="11"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
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
      </div>
    </TuitionStyles>
  );
}
