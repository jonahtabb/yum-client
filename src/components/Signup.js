import { useState } from "react";
import AppLoggedIn from "./AppLoggedIn";
import { FormControl, TextField, Grid, Button } from "@material-ui/core";


const Signup = (props) => {
  const [confirmPassword, setConfirmPassword] = useState();
  const [failMessage, setFailMessage] = useState("");

  const checkForNumsAndChars = (str) => {
    const chars = "1234567890!@#$%^&*()";

    for (let i = 0; i < chars.length; i++) {
      if (str.indexOf(chars[i]) > -1) {
        return true;
      } else {
        return false;
      }
    }
  };

  const confirmAndSend = (e) => {
    if (props.password !== confirmPassword) {
      setFailMessage("Passwords must match!");
    } else if (props.password.length < 5) {
      setFailMessage("Please make your password longer!");
    } else if (checkForNumsAndChars(props.password) === false) {
      setFailMessage(
        "Please use a number or special character in your password!"
      );
    } else if (props.username.length < 4) {
      setFailMessage("Please make your username longer!");
    } else {
      setFailMessage("");
      props.signUpForm(e);
    }
  };

  return (
    <>
      {props.loggedIn ? (
        <AppLoggedIn sessionToken={props.sessionToken} />
      ) : (
      
          <Grid container direction={"column"} spacing={3}>
            <Grid item>
              <h1>Sign Up!</h1>
            </Grid>

            <Grid item>
              <TextField
                id="signup-username"
                label="Username"
                variant="outlined"
                onChange={(e) => props.setUsername(e.target.value)}
                type="text"
              />
            </Grid>

            <Grid item>
              <TextField
                id="signup-password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => props.setPassword(e.target.value)}
              />
            </Grid>

            <Grid item>
              <TextField
                id="signup-password-confirm"
                label="Confirm Password"
                type="password"
                variant="outlined"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={confirmAndSend}
              > Sign Up
              </Button>
            </Grid>

            <Grid item>
              <Button variant="outlined" color="primary" onClick={props.toggle}>
                Already have an account?
              </Button>
            </Grid>
          </Grid>

      )}
      {failMessage ? <p>{failMessage}</p> : <></>}
    </>
  );
};

export default Signup;
