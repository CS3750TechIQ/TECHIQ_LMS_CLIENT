import { createGlobalStyle } from "styled-components"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Auth
import { Auth } from "./auth"

// Screens
import Account from '../screens/account'
import Addcourses from '../screens/addcourses'
import Calandar from '../screens/calendar'
import Courses from '../screens/courses'
import Notifications from '../screens/notifications'
import Registercourses from '../screens/registercourses'
import Registration from '../screens/registration'
import Home from '../screens/home'

// FullCalendar
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faEdit,
  faUpload
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faEdit,
  faUpload
);

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

const queryClient = new QueryClient()

export default function App () {
  return (
    <>
      <Styles />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Auth>
            <Switch>
              <Route path="/account">
                <Account />
              </Route>
              <Route path="/addcourses">
                <Addcourses />
              </Route>
              <Route path="/calendar">
                <Calandar />
              </Route>
              <Route path="/courses">
                <Courses />
              </Route>
              <Route path="/notifications">
                <Notifications />
              </Route>
              <Route path="/registercourses">
                <Registercourses />
              </Route>
              <Route path="/registration">
                <Registration />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Auth>    
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}