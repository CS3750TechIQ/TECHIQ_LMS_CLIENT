import styled from "styled-components";

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
`;

export default function SignUp(){
  return(
    <SignUpStyles>
      <h1>New Account</h1>
      <div className="logInContainer">
        <form className="signUpForm">
          <div className="textBoxBlock">
            <div>First Name</div>
            <input type="text" />
          </div>
          <div className="textBoxBlock">
            <div>Last Name</div>
            <input type="text" />
          </div>          
          <div className="textBoxBlock">
            <div>Email</div>
            <input type="text" />
          </div>
          <div className="textBoxBlock">
            <div>Birthdate</div>
            <input type="date" />
          </div>
          <div className="textBoxBlock">
            <div>Password</div>
            <input type="password" />
          </div>
          <div className="textBoxBlock">
            <div>Confirm Password</div>
            <input type="password" />
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