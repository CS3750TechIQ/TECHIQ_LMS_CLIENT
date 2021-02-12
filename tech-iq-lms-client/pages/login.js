import styled from 'styled-components';

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

  .signUpForm {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem;
  }

  .textBoxBlock {
    color: #A0A0A0;
    margin: 1rem;
    font-size: 1.5rem;
    padding-left: 12.5%;
  }

  .buttonContainer {
    width: 100%;
    text-align: center;
    padding-left: 12.5%;
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
  return(
    <LoginStyles>
      <h1>Log In</h1>
        <div className="logInContainer">
          <form className="signUpform">
            <div className="textBoxBlock">
              <input placeholder="Username" type= "text" />
            </div>
            <div className="textBoxBlock">
              <input placeholder="Password" type="password" />
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
        <h2>Need an account? <a href="http://localhost:3000/signup">Sign up here</a></h2>
    </LoginStyles>
  )
}