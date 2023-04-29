import PreviewView from './previewView.js';

class BookmarkView extends PreviewView{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = `No bookmarks yet!`;
    _successMessage = '';
}

export default new BookmarkView();