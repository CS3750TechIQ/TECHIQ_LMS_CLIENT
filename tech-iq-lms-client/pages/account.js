import styled from "styled-components";
import { SocialIcon } from "react-social-icons";
import { useState } from 'react';
import Nav from "../components/navBar";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const AccountStyles = styled.div`
  .accountContainer {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    width: 700px;
    margin: auto;
    margin-top: 50px;
    box-shadow: 0.25px 0.25px 1px #a0a0a0;
  }

  .userImage {
    display: flex;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    padding-top: 5px;
    background-position: center center;
    background-size: cover;
  }

  .one {
    background-image: url("http://placehold.it/400x200");
  }

  .canvasInfo {
    color: grey;
    font-size: 18px;
    padding: 1rem;
  }

  .bioContainer {
    display: flex;
    flex-wrap: wrap;
    width: 700px;
    border-radius: 0.5 rem;
  }

  .iconContainer {
    display: flex;
    justify-content: center;
    align-content: space-between;
    width: 700px;
    padding: 2px;
  }
`;

export default function Account() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
        <Nav/>
        {
          isEditing ? 
          <button onClick={() => {setIsEditing(true)}}>Edit</button> :
          <button type="submit" onClick={() => {setIsEditing(false)}}>Save</button>         
        }
        {!isEditing ? <ViewingAccount /> : <EditingAccount />}
    </div>
  ) 
}

function ViewingAccount() {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('userData');
  return (
    <AccountStyles>
      <div className="accountContainer">
        <div className="userImage one" />

        <div className="canvasInfo">
          <h1>{userData.data.firstName + " " + userData.data.lastName}</h1>
          <p>{userData.data.phoneNumber}</p>
          <p>{userData.data.username}</p>
        </div>
        <div className="iconContainer">
          <SocialIcon url="https://github.com/" />
          <SocialIcon url="https://www.linkedin.com/" />
          <SocialIcon url="https://twitter.com" />
        </div>
        <h4>Bio</h4>
        <div className="bioContainer">
          <p>{userData.data.userBio}</p>
        </div>
      </div>
    </AccountStyles>
  );
}

const updateUserBio = async () => {
  const [userPhone, setUserPhone] = useState('');
  const [userBio, setUserBio] = useState('');
  const username = userData.data.username;

  try {
    const res = await axios.put('http://localhost:50058/Account/UpdateUserBio', {
      userBio,
      userPhone,
      username,
    });
  }catch(e) {
    alert(e);
  }
}
function EditingAccount() {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('userData');



  return (
    <AccountStyles>
      <div className="accountContainer">
        <div className="userImage one" />

        <div className="canvasInfo">
          <h1>{userData.data.firstName + " " + userData.data.lastName}</h1>
          <input 
            type="text" 
            onChange={(e) => setUserPhone(e.target.value)}
          />
          <p>{userData.data.username}</p>
        </div>
        
        <div className="iconContainer">
          <SocialIcon url="https://github.com/" />
          <SocialIcon url="https://www.linkedin.com/" />
          <SocialIcon url="https://twitter.com" />
        </div>
        <h4>Bio</h4>
        <div className="bioContainer">
        <form>
          <input 
            type="text" 
            onChange={(e) => setUserBio(e.target.value)}
          />
        </form>
        </div>
      </div>
    </AccountStyles>
  );
}
