import React, {useState,useEffect} from 'react';
import RecipeSearch from './RecipeSearch';

const AppLoggedIn = () => {

    const [newRecipe, setNewRecipe] = useState(false);

    useEffect(() => {
        if (newRecipe){
            console.log(`Add New Recipe Triggered`)
            //Do the things if new recipe is set to true on state change.
        }
        setNewRecipe(false)
        
    })

    return(
        <>
        <RecipeSearch newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
        </>
    )
}

export default AppLoggedIn