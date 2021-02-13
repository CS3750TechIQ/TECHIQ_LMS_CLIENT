import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios'
import { Router, useRouter } from 'next/router';

const LoginStyles = styled.div`

  input[type='text'],
  input[type='password']
  button {
    -webkit-appearance: none;
  }

  input[type='text'],
  input[type='password'] {
    border: 1px solid #A0A0A0;
    height: 1.5rem;
  }

  a:link{
    text-decoration: none;
    font-style: italic;
  }


  a:hover{
    font-size: 1.1rem;
  }

  h1 {
    text-align: center;
    font-size: 4rem;
  }

  h2 {
    text-align: center;
    font-size: 1rem;
  }
   
   .logInContainer {
    display: flex;
    background-color: white;
    width: 400px;
    margin: auto;
    border-radius: .5rem;
    box-shadow: .25px .25px 1px #A0A0A0;  
  }

  .logInForm {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem;
  }

  .textBoxBlock {
    color: #A0A0A0;
    margin: 1rem;
    font-size: 1.5rem;
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
`

export default function Login() {

  // create instance of router
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //function that will send a Post request to the server
  const logInAccount = async () => {
    
    try{
      const res = await axios.post('test',
      {
        email,
        password
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
    <LoginStyles>
      <h1>Log In</h1>
        <div className="logInContainer">
          <form 
            className="logInForm"
            onSubmit={e =>{
              e.preventDefault()
              logInAccount()
            }}>
            <div className="textBoxBlock">
              <input 
                placeholder="Email" 
                type= "email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="textBoxBlock">
              <input 
                placeholder="Password" 
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="buttonContainer">
              <button
                className="submitButton"
                type="submit"
              >
                  Sign In
              </button>
            </div>
          </form>
        </div>
        <h2>Don't have an account? <a href="http://localhost:3000/signup">Sign up here</a></h2>
    </LoginStyles>
  )
}