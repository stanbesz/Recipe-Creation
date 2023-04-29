class SearchView{
    _parentEl = document.querySelector('.search');

    getQuery(){
        const query =  this._parentEl.querySelector('.search__field').value;
        console.log(query);
        this._clearInput();
        return query;
    }
    _clearInput(){
        this._parentEl.querySelector('.search__field').value = '';
    }
    addHandlerSearch(handler){
        this._parentEl.addEventListener('submit', function(e){
            e.preventDefault();//to disable refresh
            handler();
        })
    }
}
export default new SearchView();