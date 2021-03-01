import styled from "styled-components";


const classNotificationStyles = styled.div`

    .notificationHeader{
        text-align: left;
        text-decoration: underline;
    }
    .courseName {
        text-align: left;   
    }

    .notificationDesc {
        padding: 10px 8px;
        height: 105px
    }

`;

export default function notificationCards() {
    return(
        <classNotificationStyles>
            <div class="card">
                <h3 class="notificationHeader">Notification Title</h3>
                <p class="notificationDesc">Notification Description</p>
                <p class="notificationDate">Date announced: 01/12/2021</p>
                <hr/>
            </div>
        </classNotificationStyles>  
    )

}

