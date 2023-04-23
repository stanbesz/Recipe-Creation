import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
//import icons from '../${icons}.svg';//Parcel 1
//import icons from 'url:../img/icons.svg';//Parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(module.hot){
  module.hot.accept();
}

//done by using an image and rotating it slowly 360 degrees
const controlRecipe = async function(){
  try{
    resultsView.renderSpinner();
    console.log(resultsView);
    const id = window.location.hash.slice(1);
    console.log(id);
    
    if(!id)return;
    //1. Load recipe
    recipeView.renderSpinner();
    
    await model.loadRecipe(id);
    
    //2. Render recipe
    recipeView.render(model.state.recipe);
 
  }catch(err){
    recipeView.renderError(`${err.message}💥💥💥💥`);
  }
}

const controlSeachResults = async function(){
  try{
    //1) Get search query
    const query = searchView.getQuery();
    if(!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);
    //3) Render results
    //console.log(model.state.search.results);

    resultsView.render(model.state.search.results);
  }catch(err){
    console.log(err);
  }
}
const init = function(){
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSeachResults);
}
init();
