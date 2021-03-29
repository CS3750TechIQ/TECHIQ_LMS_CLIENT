import React from "react";
import Nav from "../components/navBar";
import styled from "styled-components";

const TuitionStyles = styled.div`

    .tuitionContainer {
        padding: 2rem;
        width: 750px;
        margin: auto;
        margin-top: 50px;
        border-radius: 4px;
        box-shadow: 0.25px 0.25px 3px #a0a0a0;
    }



`;



export default function tuition() {
    
    return(
        <TuitionStyles>
            <Nav />
            <div className="tuitionContainer">
                <label>Name on card: </label>
                <input
                    type="text"
                />
                <label>Credit card number: </label>
                <input
                    type="text"
                />
                <label>Expiration date: </label>
                <input
                    type="text"
                />
                <label>CVC Number: </label>
                <input
                    type="text"
                />
                <label>Payment amount: </label>
                <input
                    type="text"
                />
                <label>Credit card number: </label>
                <input
                    type="text"
                />
                <button>
                    Submit payment
                </button>
            </div>

        </TuitionStyles>
    );
}