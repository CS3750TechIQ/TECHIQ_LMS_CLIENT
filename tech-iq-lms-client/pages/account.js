import styled from "styled-components";
import { SocialIcon } from "react-social-icons";
import { useState } from 'react';
import Nav from "../components/navBar";
import { useQuery, useQueryClient } from "react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const AccountStyles = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    width: 750px;
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

  .inputFile{
    margin: 2px;
  }

  .one {
    background-image: url("https://lh3.googleusercontent.com/proxy/CQrbom5H7ldcxHPzgrbcedYPJa8q3RESpTdBEPtiWgYD6aX-YEzHUek4M2XoNaCvFA5ZjAoVvu-xnYIBL6_DUkKowzEdlSckP2M");
  }

  .canvasInfo {
    color: grey;
    font-size: 18px;
    padding: 1rem;
  }

  #file[type = "file"]{
    display: none;
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
  .inputLabel{
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: none;
    background-color: Transparent;
    outline:none;
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

  const [profileImage, setProfileImage] = useState('https://lh3.googleusercontent.com/proxy/CQrbom5H7ldcxHPzgrbcedYPJa8q3RESpTdBEPtiWgYD6aX-YEzHUek4M2XoNaCvFA5ZjAoVvu-xnYIBL6_DUkKowzEdlSckP2M')

  const imageHandler = (e) =>{
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2){
        debugger;
        setProfileImage(reader.result);
      }
    }
   reader.readAsDataURL(e.target.files[0])
  }

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('userData');
  return (
    <AccountStyles>
      <div className="accountContainer">
        <div>
          <div className="userImage">
             <img src={profileImage} alt="" id="img" className="userImage"/>
          </div>
          <div>
          <span><input class="inputFile" type='file' id='file' name="image" accept="*" onChange={imageHandler}/></span>
          <label class="inputLabel" htmlFor="file"><FontAwesomeIcon icon= "upload" size="xl"/> Upload Image</label>
          </div>
        </div>

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
        <div className="bioContainer">
        <h4>Bio</h4>
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
