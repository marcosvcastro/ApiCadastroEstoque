import React from 'react';
import { withStyles } from '@material-ui/styles';
import { CssBaseline, Paper, Typography, Button, Icon, Box } from '@material-ui/core';


const styles = theme => ({
  main: {
    width: 'auto',   
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: '10%',
  },
  divLogo: {
    marginTop: theme.spacing(1),
    marginBotton: theme.spacing(1),
    width: '100%',
    padding: '12px',
       
  },
  imgResponsive: {
    maxWidth: '40%',
    height: 'auto',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
   
  },
  divMain: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  form: {
    // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(8),   
  },
  iconButton: {
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
});

function NotFound(props) {
  const { classes } = props; 
  return (
    <>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.divMain}>
      
        <div className={classes.divLogo}>
            <img className={classes.imgResponsive} src={require('./assets/images/error404emoji.png')} alt="404" />
          </div>
        
          <Typography component="div" color="primary" >
            <Box fontSize={56} fontWeight="fontWeightBold" m={1}>
              Oops!
            </Box>
          </Typography>        


          <Typography component="h1" color="primary" align="center">
            404 - A página não pode ser encontrada!
          </Typography>
         
          <Button
            fullWidth
            variant="text"
            color="primary"

            className={classes.submit}
            onClick={props.handleGoToHomePage}
          >
            <Icon className={classes.iconButton} >input</Icon>
            Ir para página inicial
              </Button>

        </Paper>
      </main>

    </>
  );
}

export default withStyles(styles)(NotFound);