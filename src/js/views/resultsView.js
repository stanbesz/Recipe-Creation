import icons from 'url:../../img/icons.svg';
import View from './view.js';

class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipes found for your query! Please try again!`;
    _successMessage = '';

    _generateMarkup(){
        console.log(this._data);
        return this._data.map(this._generateMarkupPreview).join();
       
    }
    _generateMarkupPreview(results){
        return `
        <li class="preview">
            <a class="preview__link" href="#${results.id}">
              <figure class="preview__fig">
                <img src="${results.image}" alt="${results.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
                <!-- <div class="preview__user-generated">
                   <svg>
                     <use href="${icons}#icon-user"></use>
                   </svg>
                 </div>-->
              </div>
            </a>
          </li>
        `;
    }
}

export default new ResultsView();