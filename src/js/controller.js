import * as model from './model.js';
import {MODAL_CLOSE_ESC} from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
//import icons from '../${icons}.svg';//Parcel 1
//import icons from 'url:../img/icons.svg';//Parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if(module.hot){
//   module.hot.accept();
// }

//done by using an image and rotating it slowly 360 degrees
const controlRecipe = async function(){
  try{
    const id = window.location.hash.slice(1);
    
    if(!id)return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    //1. Load recipe
    
    await model.loadRecipe(id);
    //console.log(model.state.recipe);
    //2. Render recipe
    recipeView.render(model.state.recipe);
    
    bookmarkView.update(model.state.bookmark);
  }catch(err){
    console.log(err);
    recipeView.renderError();
  }
}

const controlSeachResults = async function(){
  try{
    resultsView.renderSpinner();

    //1) Get search query
    const query = searchView.getQuery();
    if(!query) {
      return;
    }
    //debugger;
    // 2) Load search results
    await model.loadSearchResults(query);
    //3) Render results
    //console.log(model.state.search.results);
    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //4)Render initial pagination buttons
    paginationView.render(model.state.search);
  }catch(err){
    console.log(err);
  }
}

const controlPagination = function(goToPage){
    //3) Render NEW results
    resultsView.render(model.getSearchResultsPage(goToPage));

    //4)Render NEW initial pagination buttons
    paginationView.render(model.state.search);
}

const controlServings = function(newServings){
// Update the recipe servings (in state)
model.updateServings(newServings);
// update the recipe view
//recipeView.render(model.state.recipe);
recipeView.update(model.state.recipe);
}

const controlAddBookmark = function(){
  //Add remove bookmark
  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);
  }
  else{
    //console.log("Remove bookmark");
    model.deleteBookmark(model.state.recipe.id);
  }
  //console.log(model.state.recipe);
  //Update recipeView to display if added/remove bookmark
  recipeView.update(model.state.recipe);

  //Dislpay in bookmarks
  bookmarkView.render(model.state.bookmark);
}

const controlBookmarks = function(){
  bookmarkView.render(model.state.bookmark);
}

const controlAddRecipe = async function(newRecipe){
  try{
    //console.log(newRecipe);
    //show loading spinner
    addRecipeView.renderSpinner();

    //upload recipe
    debugger;
    await model.uploadRecipe(newRecipe);
    //console.log(model.state.recipe);

    //Render new recipe
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    //Render new bookmarks
    bookmarkView.render(model.state.bookmark);

    //Change ID in URL
    window.history.pushState(null,'',`${model.state.recipe.id}`)
    //close form window
    setTimeout(function(){
      addRecipeView.toggleWindow()
    },MODAL_CLOSE_ESC*1000);
  } catch(err){
    console.error('Error in UploadRecipe:',err);
    addRecipeView.renderError(err.message);
  }
}

const init = function(){
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSeachResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log("Welcome to the site!");
  //controlServings(); asynchronous pitfall - state not yet loaded
}
init();
