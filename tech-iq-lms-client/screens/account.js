import styled from "styled-components";
import { SocialIcon } from "react-social-icons";
import { useState } from "react";
import Nav from "../components/navBar";
import { useMutation, useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

const AccountStyles = styled.div`
  h4 {
    margin-bottom: 0;
  }

  .accountContainer {
    padding: 2rem;
    width: 750px;
    margin: auto;
    margin-top: 50px;
    border-radius: 4px;
    box-shadow: 0.25px 0.25px 3px #a0a0a0;
  }

  .topSection {
    display: flex;
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

  .inputFile {
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

  #file[type="file"] {
    display: none;
  }


  .iconContainer {
    display: flex;
    width: 100%;
    padding: 2px;
  }

  .icon {
    margin: 1rem;
  }

  .inputLabel {
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: none;
    background-color: Transparent;
    outline: none;
  }
  .imageContainer{
    margin: 8px;
  }

  .bioContainer {
    display: flex;
    flex-wrap: wrap;
    width: 700px;
    border-radius: 0.5 rem;
  }

  .bioTextArea {
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;   

    border: 1px solid #a0a0a0;
    border-radius: 8px;
    margin: 1rem 2rem 2rem 2rem; 
  }

  .editButton {
  }
`;

const getUserInfo = async (username) => {
  return await axios.get("http://localhost:50058/Account/" + username + "/getUser").then(res => res.data)
}

export default function Account() {
  //Get Local user info cache
  const localUserData = useLocalStorage('user')
  const [userBioText, setUserBio] = useState(localUserData[0].userBio);
  const userInfoQuery = useQuery(['userInfo', localUserData[0].username], async () => {
    const data = await getUserInfo(localUserData[0].username)
    setUserBio(data?.userBio ?? '')
    setUserPhone(data?.userPhone ?? '')
    return data
  })
  //Set initial state
  const [ isEditing, setIsEditing ] = useState(false);
  const [userPhone, setUserPhone] = useState(localUserData[0].userPhone);
  const [ userName, setUserName ] = useState(localUserData[0].username);
  const [profileImage, setProfileImage] = useState(
    "https://lh3.googleusercontent.com/proxy/CQrbom5H7ldcxHPzgrbcedYPJa8q3RESpTdBEPtiWgYD6aX-YEzHUek4M2XoNaCvFA5ZjAoVvu-xnYIBL6_DUkKowzEdlSckP2M"
    );
  
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        debugger;
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //Update DB Mutation
  const updateUserInfoMutation = useMutation(async () => {
    const { data } = await axios.put(
      "http://localhost:50058/Account/UpdateUserBio",
      {
        userBio: userBioText,
        userPhone,
        userName
      }
    )
    return data
  }, {
    onSuccess: data => {
      setIsEditing(false)
      getCurrentUserInfoMutation.mutate()      
    },
    onError: err => {
      console.error(err)
      alert("something went wrong");
    }
  })

  //update the state to the most recent DB changes
  const getCurrentUserInfoMutation = useMutation(async () => {
    const { data } = await axios.get("http://localhost:50058/Account/" + localUserData[0].username + "/getUser")
    return data
  }, {
    onSuccess: data => {
      setUserBio(data.userBio)
    }
  })

  if (userInfoQuery.isLoading) {
    return 'Loading...'
  }

  if (userInfoQuery.isError) {
    return "There was an error getting user info."
  }

  return (
    <AccountStyles>
      <Nav />
      <div className="accountContainer">
        <div className="topSection">
          <div className="userImage">
            <img src={profileImage} alt="" id="img" className="userImage" />
          </div>
          <div className="imageContainer">
          <span><input class="inputFile" type='file' id='file' name="image" accept="*" onChange={imageHandler}/></span>
          <label class="inputLabel" htmlFor="file"><FontAwesomeIcon icon= "upload" size="xl"/> Upload Image</label>
          </div>

          <div className="canvasInfo">
            <h1>{localUserData[0].firstName + " " + localUserData[0].lastName}</h1>
            {              
              !isEditing ?
              <p>{userPhone}</p> :
              <div>
                <label>Enter Current Phone Number</label>
                <input type="text" placeholder={userPhone} onChange={(e) => {setUserPhone(e.target.value)}} />
              </div>
            }        
            <p>{userName}</p>
            <div className="iconContainer">
              <SocialIcon className="icon" url="https://github.com/" />
              <SocialIcon className="icon" url="https://www.linkedin.com/" />
              <SocialIcon className="icon" url="https://twitter.com" />
            </div>
          </div>
        </div>
        <h4>Bio</h4>
        <div className="bioContainer">
          {
            !isEditing ? 
            <p>{userBioText}</p> :
            <textarea id="bio" className="bioTextArea" rows="6" cols="75" defaultValue={userInfoQuery.data.userBio} onChange={(e) => {setUserBio(e.target.value)}} />
          }
        </div>
        {
          isEditing ?
          <button className="editingButton" onClick={() => {updateUserInfoMutation.mutate()}}>Save</button> :
          <button className="editingButton" onClick={() => {setIsEditing(true)}}>Edit Page</button>
        }
      </div>
    </AccountStyles>
  );
}
