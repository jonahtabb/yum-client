import AppLoggedIn from "./AppLoggedIn";
import {FormControl, Grid, TextField, Button} from '@material-ui/core';

const Login = (props) => {
  return (
    <>
      {props.loggedIn ? (
        <AppLoggedIn sessionToken={props.sessionToken} />
      ) : (
        <FormControl>
          <Grid container direction={"column"} spacing={3}>
            <Grid item>
              <h1>Login</h1>
            </Grid>
            <Grid item>
                <TextField
                id="login-username"
                label="Username" 
                variant="outlined"
                onChange={(e) => props.setUsername(e.target.value)}
                type= "text"
                />
            </Grid>
            <Grid item>
                <TextField 
                id="login-password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => props.setPassword(e.target.value)}
                />
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={props.loginForm}
                > Login
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={props.toggle}
                > Don't have an account?
                </Button>
            </Grid>
          </Grid>
        </FormControl>
      )}
    </>
  );
};

export default Login;
