import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View{
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnClose = document.querySelector('.btn--close-modal');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');

constructor(){
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
}
    toggleWindow(){
        this._overlay.classList.toggle('hidden'); 
        this._window.classList.toggle('hidden');
    }

    _addHandlerHideWindow(){
        this._btnClose.addEventListener('click',this.toggleWindow.bind(this)) 
        this._overlay.addEventListener('click',this.toggleWindow.bind(this)); 
    }

    _addHandlerShowWindow(){
        this._btnOpen.addEventListener('click',this.toggleWindow.bind(this));
        
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit',function(e){
            e.preventDefault();
            const dataArr = [...new FormData(this)];//
            const data = Object.fromEntries(dataArr);//method 
            handler(data);
        })
    }
}
export default new AddRecipeView();