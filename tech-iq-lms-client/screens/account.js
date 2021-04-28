import styled from "styled-components";
import { SocialIcon } from "react-social-icons";
import { useState, useEffect } from "react";
import Nav from "../components/navBar";
import { useMutation, useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useUser } from "../hooks/useUser";

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

  p,
  label {
    padding: 0.25rem;
  }

  .accountContainer {
    background-color: #072f60;
    padding: 2rem;
    width: 750px;
    margin: auto;
    margin-top: 50px;
    border-radius: 4px;
    box-shadow: 1px 1px 10px #a0a0a0;
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

  .imageContainer {
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
    border-radius: 4px;
    box-shadow: 1px 1px 5px #141a18;
  }

  .editButton {
    font-size: 1.2rem;
    margin: 1rem;
    width: 125px;
    padding: 0.5rem;
    color: #ffffff;
    border-radius: 4px;
    box-shadow: 1px 1px 5px #141a18;
    background-color: #44a04b;

    :hover {
      transform: scale(1.1);
    }
  }

  .allFont {
    color: #ffffff;
  }
`;

const getUserInfo = async (username) => {
  return await axios
    .get("http://localhost:50058/Account/" + username + "/getUser")
    .then((res) => res.data);
};

export default function Account() {
  //Get Local user info cache
  const [user, setUser] = useUser();
  const [userId, setUserId] = useState(user.userType === "Student" ? user.studentId : user.instructorid)
  const [userBioText, setUserBio] = useState(user?.userBio);
  //Set initial state
  const [isEditing, setIsEditing] = useState(false);
  const [userPhone, setUserPhone] = useState(user?.userPhone);
  const [userName, setUserName] = useState(user?.username);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  
  const userInfoQuery = useQuery(["userInfo", user?.username], async () => {
    const data = await getUserInfo(user?.username);
    setUserBio(data?.bio ?? "");
    setUserPhone(data?.phone ?? "");
    setFirstName(data?.firstName ?? "");
    setLastName(data?.lastName ?? "");
    setGithubLink(data?.githubLink ?? "https://github.com/");
    setLinkedInLink(data?.linkedInLink ?? "https://www.linkedin.com/");
    setTwitterLink(data?.twitterLink ?? "https://twitter.com/");
    return data;
  });

  const fileSelectedHandler = event => {
    setProfileImage(event.target.files[0]);
    console.log(event.target.files[0]);

    readImageData(event.target.files[0]);
  }

  function readImageData(imageData) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDisplayImage(reader.result);
        console.log(displayImage);

      }
    };
    reader.readAsDataURL(imageData);
  }

  useEffect(async () => {
    console.log("userID " + userId)
    await axios
      .get("http://localhost:50058/Account/"+ userId +"/GetProfileImage")
      .then((result) => {
        if(result.data.fileURL === null){
          setDisplayImage("https://lh3.googleusercontent.com/proxy/wph-j8oHGLHePJkX8ArsiGLb7X6AEJY6I6Dj2K83QQQQztfh2aDX915HRhIn1F1EDJ9TXViWm3vfoEqBZtu4r53LFYmt9WNsZ6sQND6M2Q");
        }else{
          setDisplayImage(result.data.fileURL);
        }
      });
  }, []);

  //Update DB Mutation
  const updateUserInfoMutation = useMutation(
    async () => { 
        const {imgData} = await axios.put("http://localhost:50058/Account/profileImage",
        {
          userId: userId,
          fileURL: displayImage
        }
        )

      const { data } = await axios.put(
        "http://localhost:50058/Account/UpdateUserBio",
        {
          bio: userBioText,
          phone: userPhone,
          firstName,
          lastName,
          
          githubLink:
            githubLink !== "" && githubLink !== null
              ? githubLink
              : "https://github.com/",
          linkedInLink:
            linkedInLink !== "" && linkedInLink !== null
              ? linkedInLink
              : "https://www.linkedin.com/",
          twitterLink:
            twitterLink !== "" && twitterLink !== null
              ? twitterLink
              : "https://twitter.com/",
          userName,
        }
      );
      return data, imgData;
    },
    {
      onSuccess: (data) => {
        setIsEditing(false);
        getCurrentUserInfoMutation.mutate();
      },
      onError: (err) => {
        console.error(err);
        alert("something went wrong");
      },
    }
  );

  //update the state to the most recent DB changes
  const getCurrentUserInfoMutation = useMutation(
    async () => {
      const { data } = await axios.get(
        "http://localhost:50058/Account/" + user?.username + "/getUser"
      );
      return data;
    },
    {
      onSuccess: (data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setUserBio(data.bio);
        setUserPhone(data.phone);
        setGithubLink(data.githubLink);
        setLinkedInLink(data.linkedInLink);
        setTwitterLink(data.twitterLink);
      },
    }
  );

  if (userInfoQuery.isLoading) {
    return "Loading...";
  }

  if (userInfoQuery.isError) {
    return "There was an error getting user info.";
  }
  

  return (
    <AccountStyles>
      <Nav userType={user.userType} />
      <div className="accountContainer">
        <div className="topSection">
          <div className="userImage">
            <img src={displayImage} alt="" id="img" className="userImage" />
          </div>
          <div className="imageContainer">
            <span>
              <input
                className="inputFile"
                type="file"
                id="file"
                name="image"
                accept="*"
                onChange={fileSelectedHandler}
              />
            </span>
            <label className="inputLabel allFont" htmlFor="file">
              <FontAwesomeIcon className="allFont" icon="upload" />{" "}
              Upload Image
            </label>
          </div>

          <div className="canvasInfo">
            {isEditing ? (
              <div>
                <div className="editContainer">
                  <label>First Name: </label>
                  <input
                    type="text"
                    defaultValue={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </div>
                <div className="editContainer">
                  <label>Last Name: </label>
                  <input
                    type="text"
                    defaultValue={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
              </div>
            ) : (
              <h1 className="allFont">{firstName + " " + lastName}</h1>
            )}
            {!isEditing ? (
              <div>
                <p className="allFont">{userPhone}</p>
                <p className="allFont">{userName}</p>
              </div>
            ) : (
              <div className="editContainer">
                <label>Phone Number: </label>
                <input
                  type="text"
                  defaultValue={userPhone}
                  onChange={(e) => {
                    setUserPhone(e.target.value);
                  }}
                />
                <p>Email: </p>
                <p>{userName}</p>
              </div>
            )}
            {isEditing ? (
              <div className="editContainer">
                <label>Github Profile Page URL</label>
                <input
                  type="text"
                  defaultValue={githubLink}
                  onChange={(e) => {
                    setGithubLink(e.target.value);
                  }}
                />
                <label>Indeed Profile Page URL</label>
                <input
                  type="text"
                  defaultValue={linkedInLink}
                  onChange={(e) => {
                    setLinkedInLink(e.target.value);
                  }}
                />
                <label>Twitter Profile Page URL</label>
                <input
                  type="text"
                  defaultValue={twitterLink}
                  onChange={(e) => {
                    setTwitterLink(e.target.value);
                  }}
                />
              </div>
            ) : (
              <div className="iconContainer">
                <SocialIcon className="icon" url={githubLink} />
                <SocialIcon className="icon" url={linkedInLink} />
                <SocialIcon className="icon" url={twitterLink} />
              </div>
            )}
          </div>
        </div>
        <h4 className="allFont">Bio</h4>
        <div className="bioContainer">
          {!isEditing ? (
            <p>{userBioText}</p>
          ) : (
            <textarea
              id="bio"
              className="bioTextArea"
              rows="6"
              cols="75"
              defaultValue={userBioText}
              onChange={(e) => {
                setUserBio(e.target.value);
              }}
            />
          )}
        </div>
        {isEditing ? (
          <button
            className="editButton"
            onClick={() => {
              updateUserInfoMutation.mutate();
            }}
          >
            Save
          </button>
        ) : (
          <button
            className="editButton"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit Page
          </button>
        )}
      </div>
    </AccountStyles>
  );
}
