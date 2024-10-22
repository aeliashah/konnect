import styled from "@emotion/styled";
import createTheme from "@mui/material/styles/createTheme";

// export const MyButton = styled.button`
//     background-color: pink;
//     color: white;
//     border: none;
//     padding: 10px 20px;
//     border-radius: 5px;
//     cursor: pointer;
//     &:hover {
//         background-color: red;
//     }
//     `;

let theme = createTheme({
    palette: {
      primary: {
        main: '#0052cc',
      },
      secondary: {
        main: '#edf2ff',
      },
    },
  });