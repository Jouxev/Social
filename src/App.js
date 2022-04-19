import styled from "styled-components";
import { Auth, Home } from "./Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightMode, darkMode, GlobalStyle } from "./theme";
import { ThemeProvider } from "styled-components";
import { storeState } from "./Redux/storeSlice";
import { useSelector } from "react-redux";

const Container = styled.div`
  transition: 0.2s ease all;
  height: 100vh;
`;

const App = () => {
  const { selectedTheme } = useSelector(storeState);
  return (
    <BrowserRouter>
      <ThemeProvider theme={selectedTheme === "light" ? lightMode : darkMode}>
        <Container>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Auth signin />} />
            <Route path="/register" element={<Auth register />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
