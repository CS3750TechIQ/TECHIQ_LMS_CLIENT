import styled from "styled-components";
import Nav from "../components/navBar";
import Button from "../components/button";

const HomeStyles = styled.div`
    color: red;
    .hello{
      font-size: 12rem;
    }
`;

export const getServerSideProps = () => {
  // Get the user's session based on the request
  //const user = req.session.get('user')
  const user = false;

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
}

export default function Home() {
  return (
    <HomeStyles>
      <Nav />
      <div className="hello">Hello</div>
      <h1>Home Page</h1>
      <Button />
    </HomeStyles>
  )
}
