import styled, { css } from "styled-components";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { storeState, setDarkTheme, setLightTheme } from "../Redux/storeSlice";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  text-align: center;
  & > svg {
    color: ${(props) => props.theme.fontColor};
    font-size: 2rem;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const ThemeswitchIcon = () => {
  const { selectedTheme } = useSelector(storeState);
  const dispatch = useDispatch();

  const ToggleTheme = () => {
    selectedTheme === "light"
      ? dispatch(setDarkTheme())
      : dispatch(setLightTheme());
  };
  return (
    <Container>
      {selectedTheme === "light" ? (
        <LightModeIcon onClick={() => ToggleTheme()} />
      ) : (
        <NightsStayIcon onClick={() => ToggleTheme()} />
      )}
    </Container>
  );
};
