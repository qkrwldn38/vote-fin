import { Montserrat } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      default: '#0b2347',
      paper: '#0b2347',
    },
    primary: {
      main: '#0b2347',
      light: '#2a61a8',
    },
    secondary: {
      main: '#66BB6A',
      light: '#455A64',
    },

    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
})

export default theme
