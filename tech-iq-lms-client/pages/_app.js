import { createGlobalStyle } from "styled-components"
import { Auth } from "../components/auth"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
//FullCalendar
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faEdit ,
  faUpload
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faEdit,
  faUpload
);

//React.component('font-awesome-icon', FontAwesomeIcon);

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
  const queryClient = new QueryClient()
  return(
      <QueryClientProvider client={queryClient}>
        <Auth>
          <Styles />
          <Component {...pageProps} />
        </Auth>    
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  )}
export default MyApp;
