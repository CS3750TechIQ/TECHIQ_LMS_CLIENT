import styled from "styled-components";
import React, { useState } from 'react';
import axios from 'axios'
import { Router, useRouter } from 'next/router';
import { redirect } from "next/dist/next-server/server/api-utils";

const SignUpStyles = styled.div`
  input[type='text'],
  input[type='password']
  button {
    -webkit-appearance: none;
  }

  input[type='radio'] {
    transform: scale(1.4);
  }

  input[type='text'],
  input[type='password'] {
    border: 1px solid #A0A0A0;
    height: 1.5rem;
  }

  h1 {
    text-align: center;
    font-size: 4rem;
  }

  .logInContainer {
    display: flex;
    background-color: white;
    width: 500px;
    margin: auto;
    border-radius: .5rem;
    box-shadow: .25px .25px 1px #A0A0A0;
  }

  .signUpForm {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    padding: 1rem;
  }

  .textBoxBlock {
    color: #A0A0A0;
    margin: 1rem;
  }

  .radioBlock {
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
  }

  .radio {
    padding: .4rem;
    margin: 1rem;
  }

  .buttonContainer {
    width: 100%;
    text-align: center;
  }

  .submitButton {
    font-size: 1.2rem;
    margin: 1rem;
    width: 200px;
    padding: .75rem;
    color: white;
    border: 1px solid #A0A0A0;
    border-radius: 1rem;
    background-color: #0a66c2;

    :hover {
      transform: scale(1.1);
    }
  }

  .missingFields{
    color: red;
    text-align: center;  
    transform: scale(1);
    animation: pulse 2s infinite;

    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
      }

      70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
      }

      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
      }
  }


}
`;

export default function SignUp(){
  //create instance of router
  const router = useRouter();

  //Create state objects that will hold the user info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [blankFields, setBlankFields] = useState(false);

  //function that will send a Post request to the server
  const createAccount = async () => {

    //#region input verification
    if(firstName === null || firstName === "")
    {
      setBlankFields(true);
      return;
    }
    else if(lastName === null || lastName === "")
    {
      setBlankFields(true);
      return;
    }
    else if(email === null || email === "")
    {
      setBlankFields(true);
      return;
    }
    else if(birthdate === null || birthdate === "")
    {
      setBlankFields(true);
      return;
    }
    else if(password === null || password === "")
    {
      setBlankFields(true);
      return;
    }
    //#endregion input verification


    if(password != confirmPassword)
      {
        alert("Passwords do not match");
        return;
      }

    try{
      console.log(password)
      const res = await axios.put('http://localhost:50058/Account/addUser',
      {
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "birthDate": birthdate,
        "username": email
      })
      if(res.status === 200)
        router.reload();
    }
    catch(e)
    {
      alert(e)
    }
  }


  return(
    <SignUpStyles>
      <h1>New Account</h1>
      <div className="logInContainer">
        <form 
          className="signUpForm"
          onSubmit={e =>{
            e.preventDefault()
            createAccount()
          }}>
          <div className="textBoxBlock">
            <div>First Name</div>
            <input 
              type="text"
              onChange={e => setFirstName(e.target.value)}                 
            />
          </div>
          <div className="textBoxBlock">
            <div>Last Name</div>
            <input 
              type="text"
              onChange={e => setLastName(e.target.value)}                 
            />
          </div>          
          <div className="textBoxBlock">
            <div>Email</div>
            <input 
              type="text"
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <div className="textBoxBlock">
            <div>Birthdate</div>
            <input 
              type="date" 
              onChange={e => setBirthdate(e.target.value)}
            />
          </div>
          <div className="textBoxBlock">
            <div>Password</div>
            <input 
              type="password" 
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="textBoxBlock">
            <div>Confirm Password</div>
            <input 
              type="password"
              onChange={e => setConfirmPassword(e.target.value)}  
            />
          </div>
          <div className="radioBlock">
            <label>Instructor</label>
            <input 
              className="radio"
              type="radio" 
              id="instructor"
              name="userType" />
            <label>Student</label>
            <input 
              className="radio"
              type="radio" 
              id="student"
              name="userType" />
          </div> 
          {blankFields === true ? 
            <div className="missingFields">Missing required fields</div>
            : null }
          <div className="buttonContainer">
            <button 
              className="submitButton" 
              type="submit"
            >
              Create Account
            </button>            
          </div>
        </form>
      </div>
    </SignUpStyles>
  )
}