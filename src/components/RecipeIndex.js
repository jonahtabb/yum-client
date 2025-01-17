import APIURL from '../helpers/environment'

import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CardMedia,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ExpandMoreIcon,
} from '../materialuiexports';
import { flexbox } from '@material-ui/system';

const RecipeIndex = (props) => {
  const [recipes, setRecipes] = useState([]);
  const renderTrigger = false

  const fetchRecipes = () => {
    fetch(`${APIURL}/cookbook/getall`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData)
        jsonData.sort((a, b) => {
          return a.id - b.id;
        });
        setRecipes(jsonData);
        console.log(jsonData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setTimeout(fetchRecipes(), 5000)
    
  }, [renderTrigger, props.newRecipe]);


  //Delete recipe
  const deleteRecipe = async (recipeId) => {
    try {
      let response = await fetch(
        `${APIURL}/cookbook/delete/${recipeId}`,
        {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.sessionToken}`,
          }),
        }
      );
      let jsonData = await response.json();
      //console.log(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHelper = (e) => {
    e.preventDefault();
    //console.log('recipe deleted');
    //console.log(e.target);
    let clickedButton = e.target.closest('button');
    let recipeToRemove = clickedButton.getAttribute('recipeid-data');
    //console.log(recipeToRemove);

    deleteRecipe(recipeToRemove);
    fetchRecipes();
  };

  //Save Notes
  const saveNotes = async (recipeId, updatedNotes) => {
    try {
      await fetch(
        `${APIURL}/cookbook/update/${recipeId}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            cookbook: {
              notes: updatedNotes,
            },
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.sessionToken}`,
          }),
        }
      );
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const handleSaveNotes = async (e) => {
    e.preventDefault();
    let recipeId = e.target[2].getAttribute('recipeid-data');
    let updatedNotes = e.target[0].value;
    await saveNotes(recipeId, updatedNotes);
    fetchRecipes();

    e.target[2].innerText = 'Notes saved!';
  };

  const handleEditNotes = (e) => {
    let parentNode  = e.target.closest("form");
    let button = parentNode.querySelector("#save-button");
    button.innerText = "SAVE NOTES";
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      
      maxWidth: 345,
      height: "100%"
    },
    media: {
      height: '100%',
      paddingTop: '56.25%',
      
     
    },
    notes: {
    
      margin: '15px 0px 1px 0px',
      '& .MuiTextField-root': {
        width: '100%',
      },
    },

    accHeading: {
      color: '#476040',
      alignItems: 'center',
      justifyContent: 'center',
    },

    cardCustom:{
      alignSelf:"stretch"
    }

  }));

  const classes = useStyles();

  return (
    <Container maxWidth="lg" style={{marginBottom:"70px"}}>
      <h1>Cook Book</h1>
      <p>Search for ingredients and add recipes above!</p>
      <Grid container spacing={3}>
        {recipes.map((recipe) => {
          return (
            <Grid item key={`cb-${recipe.id}`} xs={12} sm={6} md={4} xl={3}>
              <Card className={classes.cardCustom}>
                <CardContent>
                  <Typography style={{
                  color: '#476040',
                }}
                >{recipe.recipeName}</Typography>
                </CardContent>
                <CardMedia
                  className={classes.media}
                  image={recipe.image}
                  title={recipe.recipeName}
                />
                <CardContent>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.accHeading}>
                        View Ingredients
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography style={{
                  color: '#476040',
                }}>{recipe.ingredients}</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <br />
                  <a href={recipe.url} target="blank" alt=""
                   style={{
                    color: '#b55139',
                  }}>
                    View Full Recipe at {recipe.source}
                  </a>

                  <form
                    onSubmit={handleSaveNotes}
                    className={classes.notes}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      onChange={handleEditNotes}
                      id="outlined-multiline-static"
                      label="Notes"
                      multiline
                      rows={4}
                      placeholder="Enter Your Notes"
                      defaultValue={recipe.notes}
                      variant="outlined"
                  
                    />

                    <Button
                      id="save-button"
                      type="submit"
                      recipeid-data={recipe.id}
                      variant="outlined"
                      style={{
                        marginTop:"8px",
                        color: "#b55139"
                      }}
                     
                    >
                      Save Notes
                    </Button>
                  </form>
                </CardContent>

                <Button
                  onClick={deleteHelper}
                  recipeid-data={recipe.id}
                  style={{
                    background: '#ed8733',
                    color: 'white',
                    marginBottom: "10px"
                   
                  }}
                >
                  Remove Recipe
                </Button>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default RecipeIndex;
