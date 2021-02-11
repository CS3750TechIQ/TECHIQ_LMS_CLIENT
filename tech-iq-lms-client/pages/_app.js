import { createGlobalStyle } from "styled-components";

const Styles = createGlobalStyle`    
    html, body {
        font-family: "Rubik", sans-serif;
        width: 100%;
        background-color: #f3f2ef
;
    }

    body {
        overflow-x: hidden;
        overflow-y: visible;
    }
`;
function MyApp({ Component, pageProps }) {
  return(
  <>
    <Styles />
    <Component {...pageProps} />
  </>
  )}

export default MyApp
