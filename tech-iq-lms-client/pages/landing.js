import styled from 'styled-components';

const LandingStyles = styled.div`

    h1{
        text-align: center;
    }

`;

export default function Landing(){

    return(
        <LandingStyles>
            <h1>You have successfully logged in.</h1> 
        </LandingStyles>              
    )
    
}