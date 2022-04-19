import styled, { css } from "styled-components";
import { Register } from "../Components/Auth/Register";
import { Signin } from "../Components/Auth/Singin";
import { mobile, tablet } from "../responsive";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { storeState, setDarkTheme, setLightTheme } from "../Redux/storeSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThemeswitchIcon } from "../Components";
const Container = styled.main`
  transition: 0.2s ease all;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  justify-content: center;
  ${tablet({
    width: "80%",
  })}
  ${mobile({
    width: "90%",
  })}
`;

const Auth = (props) => {
  const { selectedTheme } = useSelector(storeState);
  const dispatch = useDispatch();

  const ToggleTheme = () => {
    selectedTheme === "light"
      ? dispatch(setDarkTheme())
      : dispatch(setLightTheme());
  };

  return (
    <Container>
      <ThemeswitchIcon />
      {props.register && <Register />}
      {props.signin && <Signin />}
    </Container>
  );
};

export default Auth;
