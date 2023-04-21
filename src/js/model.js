import {async} from 'regenerator-runtime';
import {API_URL} from './config.js';
import {getJSON} from './helpers.js'
export const state = {
    recipe: {},
    search:{
      query:'',
      results:[],
    }
}

export const loadRecipe = async function(id){
    try{
    const data = await getJSON(
        `${API_URL}${id}`
        // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcfcc'
      );
      console.log(data);
      const { recipe } = data.data;
      state.recipe ={
        id:recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients
      };
      console.log(state.recipe);
    }
    catch(err){
        //Temp error handling
        console.error(state.recipe);
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
  }catch(err){
    console.log(`${err} went wrong!`);
  }
}