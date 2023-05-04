import {async} from 'regenerator-runtime';
import {API_URL, RES_PER_PAGE} from './config.js';
import {getJSON} from './helpers.js'
export const state = {
    recipe: {},
    search:{
      query:'',
      results:[],
      resultsPerPage:RES_PER_PAGE,
      page:1,
    },
    bookmark:[],
}

export const loadRecipe = async function(id){
    try{
    const data = await getJSON(
        `${API_URL}${id}`
        // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcfcc'
      );
      const { recipe } = data.data;
      state.recipe ={
        id:recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: +recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients
      };
      if(state.bookmark.some(bookmark=>bookmark.id===id)){
        state.recipe.bookmarked=true;
      }
      else{
        state.recipe.bookmarked=false;
      }
    }
    catch(err){
        //Temp error handling
        console.error(state.recipe);
        throw err;
    }
} 
export const loadSearchResults = async function(query){
  try{
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec=>
      {
        return{
          id:rec.id,
          title:rec.title,
          publisher:rec.publisher,
          image:rec.image_url,
        };
      }
      );
      state,search.results.page = 1;
  }catch(err){
    console.log(`${err} went wrong!`);
  }
}

export const getSearchResultsPage = function(page = state.search.page){
 state.search.page = page;
 const start = (page -1) * state.search.resultsPerPage;// 0;
 const end = page * state.search.resultsPerPage;//9;
  return state.search.results.slice(start, end);
}

export const updateServings = function(newServings){
  if(!newServings)return;
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (+ing.quantity * +newServings) / state.recipe.servings;
  });
  state.recipe.servings = +newServings;
  console.log(state.recipe.servings);
}

const persistBookmarks = function(){
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmark))
}

export const addBookmark = function(recipe){
  //add bookmark
  state.bookmark.push(recipe);

  //mark current recipe as bookmark
  if(recipe.id === state.recipe.id){
    state.recipe.bookmarked = true;
  }
  persistBookmarks();
}

export const deleteBookmark = function(id){
  //delete bookmark
  const index = state.bookmark.findIndex(el=>el.id===id);
  state.bookmark.splice(index,1);
  
  //mark current recipe not bookmarked
  if(id === state.recipe.id){
    state.recipe.bookmarked = false;
  }
  persistBookmarks();
}

const init = function(){
  const storage = localStorage.getItem('bookmarks');
  if(storage) state.bookmark = JSON.parse(storage);
}

init();
console.log(state.bookmark);

const clearBookmarks = function(){
  localStorage.clear('bookmarks');
}
//clearBookmarks();