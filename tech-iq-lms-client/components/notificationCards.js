import styled from "styled-components";


const classNotificationStyles = styled.div`

    .notificationHeader{
        text-align: left;
        text-decoration: underline;
        color: red;
    }

    .notificationDesc {
        padding: 10px 8px;
        height: 105px
    }

`;

export default function notificationCards() {
    return(
        <classNotificationStyles>

                <h3 className="notificationHeader">Notification Title</h3>
                <p className="notificationDesc">Notification Description</p>
                <p>Date announced: 01/12/2021</p>
                <hr/>

        </classNotificationStyles>  
    )

}

