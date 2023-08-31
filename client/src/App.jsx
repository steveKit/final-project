import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import HikeById from "./components/HikeById";

const App = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header
        user={user}
        isAuthenticated={isAuthenticated}
        login={loginWithRedirect}
        logout={logout}
      />
        <Main>          
          <Routes>
            <Route
              path="/"
              element={<Homepage />}
            />
            <Route
              path="/hike/:hikeId"
              element={<HikeById />}
            />
          </Routes>          
        </Main>    
    </BrowserRouter>
  )
};

const Main = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-width: 100vw;
  height: 90vh;
  max-height: 100vh;
`;

export default App;
