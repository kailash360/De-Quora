import {
    createTheme,
    ThemeProvider
  } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif',
    }
})

function ThemeContextProvider(props){
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}

export default ThemeContextProvider

