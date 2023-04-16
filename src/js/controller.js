import * as model from './model.js';
import recipeView from './views/recipeView.js';

//import icons from '../${icons}.svg';//Parcel 1
//import icons from 'url:../img/icons.svg';//Parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//done by using an image and rotating it slowly 360 degrees
const controlRecipe = async function(){
  try{
    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id)return;
  //1. Load recipe
  recipeView.renderSpinner();

  await model.loadRecipe(id);

  //2. Render recipe
  recipeView.render(model.state.recipe);
 
  }catch(err){
    alert(err,err.message);
  }
}
controlRecipe();
['hashchange','load'].forEach(ev=>window.addEventListener(ev,controlRecipe));
// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);
///////////////////////////////////////
