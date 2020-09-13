import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ListAltIcon from '@material-ui/icons/ListAlt';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    icon: {
        marginRight: theme.spacing(2),
        color: '#ddd'
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            //main: '#3F704D',
            main: '#085373',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
            contrastText: '#ddd',
        },
        secondary: {
            light: '#7c7c7c',
            main: '#00dc49',
            //color:'#ffffff'
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#fff',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});

export default function HeaderBar() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar variant="regular">
                        <ListAltIcon className={classes.icon} />
                        <Typography variant="h6" color="inherit">
                            <strong>Request a Loan</strong>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        </ThemeProvider>
    );
}
