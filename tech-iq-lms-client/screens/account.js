import styled from "styled-components"
import { SocialIcon } from "react-social-icons"
import { useState } from "react"
import Nav from "../components/navBar"
import { useMutation, useQuery } from "react-query"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import useLocalStorage from "../hooks/useLocalStorage"

const AccountStyles = styled.div`
    color: grey;

   input[type="text"],
   textarea {
    appearance: none;
    -webkit-appearance: none;
    color: #95a5a6;
    font-family: "Helvetica", arial, sans-serif;
    font-size: 18px;
    border: 1px solid #ecf0f1;
    background: white;
    margin: 6px;
    padding: 8px;
    display: inline-block !important;
    visibility: visible !important;
  }

  input[type="text"]:focus,
  textarea:focus {
    color: #95a5a6;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }

  h4 {
    margin-bottom: 0;
  }

  p, label {
    padding: .25rem;
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

  .editContainer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
    font-size: 1.2rem;
    margin: 1rem;
    width: 125px;
    padding: 0.5rem;
    color: white;
    border: 1px solid #a0a0a0;
    border-radius: 1rem;
    background-color: #0a66c2;

    :hover {
      transform: scale(1.1);
    }
  }
`;

const getUserInfo = async (username) => {
  return await axios.get("http://localhost:50058/Account/" + username + "/getUser").then(res => res.data)
}

export default function Account() {
  //Get Local user info cache
  const localUserData = useLocalStorage('user')
  const [userBioText, setUserBio] = useState(localUserData[0].userBio);
  //Set initial state
  const [ isEditing, setIsEditing ] = useState(false);
  const [userPhone, setUserPhone] = useState(localUserData[0].userPhone)
  const [ userName, setUserName ] = useState(localUserData[0].username)
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName] = useState('')
  const [ githubLink, setGithubLink ] = useState('')
  const [ linkedInLink, setLinkedInLink ] = useState('')
  const [ twitterLink, setTwitterLink ] = useState('')
  const [profileImage, setProfileImage] = useState(
    "https://lh3.googleusercontent.com/proxy/CQrbom5H7ldcxHPzgrbcedYPJa8q3RESpTdBEPtiWgYD6aX-YEzHUek4M2XoNaCvFA5ZjAoVvu-xnYIBL6_DUkKowzEdlSckP2M"
    );

  const userInfoQuery = useQuery(['userInfo', localUserData[0].username], async () => {
    const data = await getUserInfo(localUserData[0].username)
    setUserBio(data?.bio ?? '')
    setUserPhone(data?.phone ?? '')
    setFirstName(data?.firstName ?? '')
    setLastName(data?.lastName ?? '')
    setGithubLink(data?.githubLink ?? 'https://github.com/')
    setLinkedInLink(data?.linkedInLink ?? 'https://www.linkedin.com/')
    setTwitterLink(data?.twitterLink ?? 'https://twitter.com/')
    return data
  })
    
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
        bio: userBioText,
        phone: userPhone,
        firstName,
        lastName,
        githubLink: (githubLink !== '' && githubLink !== null ? githubLink : 'https://github.com/'),
        linkedInLink: (linkedInLink !== '' && linkedInLink !== null ? linkedInLink : 'https://www.linkedin.com/'),
        twitterLink: (twitterLink !== '' && twitterLink !== null ? twitterLink : 'https://twitter.com/'),
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
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setUserBio(data.bio)
      setUserPhone(data.phone)
      setGithubLink(data.githubLink)
      setLinkedInLink(data.linkedInLink)
      setTwitterLink(data.twitterLink)
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
      <Nav userType={localUserData[0].userType}/>
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
          {
            isEditing ? 
            (
            <div>
              <div className="editContainer">
                <label>First Name: </label>
                <input type="text" defaultValue={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
              </div>
              <div className="editContainer">
                <label>Last Name: </label>
                <input type="text" defaultValue={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
              </div>
            </div>
            ) :
            <h1>{firstName + " " + lastName}</h1> 
          }
            {              
              !isEditing ?
              <div>
                <p>{userPhone}</p>
                <p>{userName}</p> 
              </div> :
              <div className="editContainer">
                <label>Phone Number: </label>
                <input type="text" defaultValue={userPhone} onChange={(e) => {setUserPhone(e.target.value)}} />
                <p>Email: </p>
                <p>{userName}</p>
              </div>
            }        
            {
              isEditing ?
              <div className="editContainer">
                <label>Github Profile Page URL</label>
                <input type="text" defaultValue={githubLink} onChange={(e) => {setGithubLink(e.target.value)}} />
                <label>Indeed Profile Page URL</label>
                <input type="text" defaultValue={linkedInLink} onChange={(e) => {setLinkedInLink(e.target.value)}} />
                <label>Twitter Profile Page URL</label>
                <input type="text" defaultValue={twitterLink} onChange={(e) => {setTwitterLink(e.target.value)}} />
              </div> :
              <div className="iconContainer">
                <SocialIcon className="icon" url={githubLink} />
                <SocialIcon className="icon" url={linkedInLink} />
                <SocialIcon className="icon" url={twitterLink} />
              </div>

            }
          </div>
        </div>
        <h4>Bio</h4>
        <div className="bioContainer">
          {
            !isEditing ? 
            <p>{userBioText}</p> :
            <textarea id="bio" className="bioTextArea" rows="6" cols="75" defaultValue={userBioText} onChange={(e) => {setUserBio(e.target.value)}} />
          }
        </div>
        {
          isEditing ?
          <button className="editButton" onClick={() => {updateUserInfoMutation.mutate()}}>Save</button> :
          <button className="editButton" onClick={() => {setIsEditing(true)}}>Edit Page</button>
        }
      </div>
    </AccountStyles>
  );
}
