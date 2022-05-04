import styled from "styled-components";
import { Auth, ChatPage, Home, PostPage, Profile } from "./Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightMode, darkMode, GlobalStyle } from "./theme";
import { ThemeProvider } from "styled-components";
import { storeState } from "./Redux/storeSlice";
import { useSelector } from "react-redux";
import { userState } from "./Redux/userSlice";

const Container = styled.div`
  transition: 0.4s ease all;
  height: 100vh;
`;

const App = () => {
  const { currentUser } = useSelector(userState);
  const { selectedTheme } = useSelector(storeState);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={selectedTheme === "light" ? lightMode : darkMode}>
        <Container>
          <GlobalStyle />
          <Routes>
            <Route
              path="/"
              element={currentUser != null ? <Home /> : <Auth signin />}
            />
            <Route
              path="/chat/:id"
              element={currentUser != null ? <ChatPage /> : <Auth signin />}
            />
            <Route
              path="/chat"
              element={currentUser != null ? <ChatPage /> : <Auth signin />}
            />
            <Route
              path="/post/:id"
              element={currentUser != null ? <PostPage /> : <Auth signin />}
            />
            <Route
              path="/profile/:id"
              element={currentUser != null ? <Profile /> : <Auth signin />}
            />
            <Route
              path="/profile"
              element={currentUser != null ? <Profile /> : <Auth signin />}
            />
            <Route
              path="/signin"
              element={currentUser == null ? <Auth signin /> : <Home />}
            />
            <Route
              path="/*"
              element={currentUser == null ? <Auth signin /> : <Home />}
            />
            <Route
              path="/register"
              element={currentUser == null ? <Auth register /> : <Home />}
            />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
