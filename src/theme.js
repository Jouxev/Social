import { createGlobalStyle } from "styled-components";

export const lightMode = {
  backgroundColor: "#F3EEEA",
  fontColor: "#75464A",
  fontColorSecondary: "#AA7C7A",
  element: "#F9F9F9",
  danger: "#BEABA7",
  input: "#E8E8E9",
  boxShadow: "1px 7px 8px -1px rgba(133,133,133,0.4)",
};
export const darkMode = {
  backgroundColor: "#060930",
  fontColor: "#FFE3D8",
  fontColorSecondary: "#BBBBBB",
  element: "#333456",
  danger: "#525E75",
  input: "#0A043C",
  boxShadow: "1px 7px 8px -1px rgba(133,133,133,0.4)",
};

export const GlobalStyle = createGlobalStyle`
body{
    background: ${(props) => props.theme.backgroundColor};
    color:  ${(props) => props.theme.fontColor};
}
`;
