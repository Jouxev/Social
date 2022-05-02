import styled from "styled-components";
import { Auth, ChatPage, Home, PostPage, Profile } from "./Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightMode, darkMode, GlobalStyle } from "./theme";
import { ThemeProvider } from "styled-components";
import { storeState } from "./Redux/storeSlice";
import { useSelector } from "react-redux";

const Container = styled.div`
  transition: 0.4s ease all;
  height: 100vh;
`;

const App = () => {
  const { selectedTheme } = useSelector(storeState);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={selectedTheme === "light" ? lightMode : darkMode}>
        <Container>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<Auth signin />} />
            <Route path="/register" element={<Auth register />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
