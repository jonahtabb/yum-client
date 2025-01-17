import { createTheme } from '@material-ui/core/styles'

export default createTheme({
    palette: {
        primary: {
            main: '#789174'
        },
        secondary: {
            main: '#b65036'
        }
    },
    overrides: {
        MuiOutlinedInput: {
            notchedOutline:{
                borderColor: 'hsl(111,11%,75%)'
            }
        }
    }
})