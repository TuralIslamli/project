import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
    palette: {
        secondary: {
            main: '#23e9b4',
        },
        custom: {
            main: '#fff',
        }
    },
    components: {
        MuiOutlinedInput: {
            root: {
            },
            styleOverrides: {
                notchedOutline: {
                    color: 'white',
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: 20,
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    scrollbarWidth: 0,
                    "&::-webkit-scrollbar": {
                        display: "none"
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderWidth: 2,
                    boxSizing: 'border-box',
                    ":hover": {
                        borderWidth: 2,
                        backgroundColor: 'white',
                        color: 'black',
                        transition: '.5s'
                    },
                },
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: '0.5s',
                    ':hover': {
                        color: "#f25c66",
                    }
                }
            }
        }
    },
  });