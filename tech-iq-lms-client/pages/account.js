import styled from "styled-components";
import Nav from "../components/navBar";
import {SocialIcon} from 'react-social-icons';

const AccountStyles = styled.div`

    .accountContainer{
        display: flex;
        flex-wrap: wrap;
        padding: 5px;
        width: 700px;
        margin: auto;
        box-shadow:  0.25px 0.25px 1px #a0a0a0;
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
        background-image: url('http://placehold.it/400x200');
    }



    .canvasInfo{
        color: grey;
        font-size: 18px;
        padding: 1rem;
    }

    .bioContainer{
        display: flex;
        flex-wrap: wrap;
        width: 700px;
        border-radius: 0.5 rem;
    }

    .iconContainer{
        display: flex;
        justify-content: center;
        align-content: space-between;
        width:750px; 
        padding: 2px;   
    }
`;

export default function Account(){

    return(
        <AccountStyles>
            <Nav/>
            
            <div className="accountContainer">
            <div className="userImage one"></div>
                
                <div className="canvasInfo">
                <h1>First name Last name</h1>
                    <p>Phone number</p>
                    <p>Email</p>
                </div>
                <div className="iconContainer">
                    <SocialIcon url="https://github.com/"></SocialIcon>
                    <SocialIcon url="https://www.linkedin.com/"></SocialIcon>
                    <SocialIcon url="https://twitter.com"></SocialIcon>
                </div>
                <h4>Bio</h4>
                    <div className="bioContainer">
                        
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
            </div>
        </AccountStyles>
    )
}