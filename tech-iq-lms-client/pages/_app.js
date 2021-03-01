import { createGlobalStyle } from "styled-components";
import { Auth } from "../components/auth";
//FullCalendar
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

const Styles = createGlobalStyle`    
    html, body {
        font-family: "Rubik", sans-serif;
        width: 100%;
        background-color: #f3f2ef;
        
    }

    body {
        overflow-x: hidden;
        overflow-y: visible;
    }
`;

function MyApp({ Component, pageProps }) {

  return(

      <Auth>
        <Styles />
        <Component {...pageProps} />
      </Auth>     

  )}

export default MyApp
