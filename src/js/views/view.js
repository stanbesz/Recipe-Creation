import icons from 'url:../../img/icons.svg';
export default class View{
    _data;
    render(data){
        if(!data || (Array.isArray(data)&&data.length===0))
         return this.renderError();
        this._data=data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    renderSpinner(){
        const markup = `
        <div class="spinner">
        <svg>
          <use href="${icons}.svg#icon-loader"></use>
        </svg>
      </div>
        `;
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }
      renderError(message = this._errorMessage){
        const markup =`<div class="error">
        <div>
        <svg>
        <use href="${icons}#icon-alert-triangle"></use>
        </svg>
        </div>
        <p>${message}</p>
     </div>`;
     this._clear();
     this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    renderMessage(message = this._successMessage){
      const markup =`<div class="message">
      <div>
      <svg>
      <use href="${icons}#icon-smile"></use>
      </svg>
      </div>
      <p>${message}</p>
      </div>`;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    update(data){
        this._data=data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl,i)=>{
          const curEl = currentElements[i];
          //console.log(curEl,newEl.isEqualNode(curEl));
          //Updates changed Text
          if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim()!==''){
            //console.log('*',newEl.firstChild?.nodeValue.trim());//check value if it exists
            curEl.textContent = newEl.textContent;
          }
          //Update changed attributes
          if(!newEl.isEqualNode(curEl)){ //changes attribute 
            console.log(Array.from(newEl.attributes));
            Array.from(newEl.attributes).forEach(attr => 
              curEl.setAttribute(attr.name,attr.value));//replace attributes from the new element into the currrent element
            //console.log(newEl.attributes);
          }
        })
    }
    _clear(){
      this._parentElement.innerHTML='';
    } 
}