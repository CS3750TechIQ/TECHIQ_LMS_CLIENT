import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useMutation } from "react-query";
import useLocalStorage from "../hooks/useLocalStorage";
import { useUser } from "../hooks/useUser";


const AuthContext = createContext({});
const LoginStyles = styled.div`
  font-family: "Rubik", sans-serif;
  margin-top: 10rem;

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    appearance: none;
    -webkit-appearance: none;
    color: #95a5a6;
    font-family: "Helvetica", arial, sans-serif;
    font-size: 18px;
    border: 1px solid #ecf0f1;
    background: #ecf0f1;
    margin: 6px;
    padding: 8px;
    display: inline-block !important;
    visibility: visible !important;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  focus {
    color: #95a5a6;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }

  a:link {
    text-decoration: none;
    font-style: italic;
  }

  a:hover {
    transform: scale(1.1);
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
    border-radius: 0.5rem;
    box-shadow: 0.25px 0.25px 1px #a0a0a0;
  }

  .logInForm {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem;
  }

  .buttonContainer {
    width: 100%;
    text-align: center;
  }

  .submitButton {
    font-size: 1.2rem;
    margin: 1rem;
    width: 200px;
    padding: 0.75rem;
    color: white;
    border: 1px solid #a0a0a0;
    border-radius: 1rem;
    background-color: #0a66c2;

    :hover {
      transform: scale(1.1);
    }
  }

  .createAccount {
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      padding: 0.5rem;
    }
  }
`;
const SignUpStyles = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  margin: auto;

  input[type="radio"] {
    transform: scale(1.4);
  }

  input[type="date"],
  input[type="text"],
  input[type="password"] {
    appearance: none;
    -webkit-appearance: none;
    color: #95a5a6;
    font-family: "Helvetica", arial, sans-serif;
    font-size: 18px;
    border: 1px solid #ecf0f1;
    background: #ecf0f1;
    padding: 8px;
    display: inline-block !important;
    visibility: visible !important;
  }

  input[type="date"],
  input[type="text"],
  input[type="password"],
  focus {
    color: #95a5a6;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }

  h1 {
    text-align: center;
    font-size: 4rem;
  }

  .logInContainer {
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    justify-content: center;
    width: 700px;
    margin: auto;
    border-radius: 0.5rem;
    box-shadow: 0.25px 0.25px 1px #a0a0a0;
  }

  .signUpForm {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    width: 80%;
    justify-content: space-between;
    padding: 1rem;
  }

  .radioBlock {
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
  }

  .radio {
    padding: 0.4rem;
    margin: 2rem;
  }

  .buttonContainer {
    width: 100%;
    text-align: center;
  }

  .submitButton {
    font-size: 1.2rem;
    margin: 1rem;
    width: 200px;
    padding: 0.75rem;
    color: white;
    border: 1px solid #a0a0a0;
    border-radius: 1rem;
    background-color: #0a66c2;

    :hover {
      transform: scale(1.1);
    }
  }

  .missingFields {
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
function Auth({ children }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useUser()
  const [showSignUp, setShowSignUp] = useState(false)
  const signUpMutation = useMutation(async (email) => {
    const { data } = await axios.get("http://localhost:50058/Account/" + email + "/getUser")
    return data
  }, {
    onSuccess: data => {
      setUser(data)
    },
    onError: err => {
      console.error(err)
      alert("something went wrong");
    }
  })
  return (
    <AuthContext.Provider value={user}>
      {
        !user ? (
        <LoginStyles>
          <style jsx global>
            {`
              body {
                background: #f3f2ef;
              }
            `}
          </style>
          <h1>Log In</h1>
          <div className="logInContainer">
            <form
              className="logInForm"
              onSubmit={(e) => {
                e.preventDefault();
                signUpMutation.mutate(email)
              }}
            >
              <input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="buttonContainer">
                <button className="submitButton" type="submit">
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="createAccount">
            <h2>Don't have an account?</h2>
            <a
              onClick={() => {
                setShowSignUp(true);
              }}
            >
              Sign up here
            </a>
          </div>
          {showSignUp ? <SignUp /> : null}
        </LoginStyles>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

const useAuthState = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
};

function SignUp() {
  // create instance of router
  const router = useRouter();

  // Create state objects that will hold the user info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [blankFields, setBlankFields] = useState(false);

  // function that will send a Post request to the server
  const createAccount = async () => {
    // #region input verification
    if (firstName === null || firstName === '') {
      setBlankFields(true);
      return;
    } if (lastName === null || lastName === '') {
      setBlankFields(true);
      return;
    } if (email === null || email === '') {
      setBlankFields(true);
      return;
    } if (birthdate === null || birthdate === '') {
      setBlankFields(true);
      return;
    } if (password === null || password === '') {
      setBlankFields(true);
      return;
    } if (userType === null) {
      setBlankFields(true);
      return;
    }

    // #endregion input verification

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      console.log(password);
      const res = await axios.put('http://localhost:50058/Account/addUser', {
        password,
        firstName,
        lastName,
        birthDate: birthdate,
        username: email,
        userType,
      });
      if (res.status === 200) router.reload();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <SignUpStyles>
      <h1>New Account</h1>
      <div className="logInContainer">
        <form
          className="signUpForm"
          onSubmit={(e) => {
            e.preventDefault();
            createAccount();
            console.log(userType);
          }}
        >
          <input
            placeholder="First Name"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last Name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="date" onChange={(e) => setBirthdate(e.target.value)} />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="radioBlock">
            <label>Instructor</label>
            <input
              className="radio"
              type="radio"
              id="instructor"
              name="userType"
              onChange={(e) => setUserType('Instructor')}
            />
            <label>Student</label>
            <input
              className="radio"
              type="radio"
              id="student"
              name="userType"
              onChange={(e) => setUserType('Student')}
            />
          </div>
          {blankFields === true ? (
            <div className="missingFields">Missing required fields</div>
          ) : null}
          <div className="buttonContainer">
            <button className="submitButton" type="submit">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </SignUpStyles>
  );
}

export { Auth, useAuthState };
