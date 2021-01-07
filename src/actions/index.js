import {
	FETCH_BOOKS_SUCCESS,
	FETCH_BOOKS_FAILURE,
	FETCH_BOOKS_REQUEST,
	BOOK_ADDED_TO_CART,
	BOOK_DELETED_TO_CART,
	BOOK_DROP_TO_CART
} from '../action-types';

const booksLoaded = (newBooks) =>{
	return{
		type: FETCH_BOOKS_SUCCESS,
		payload: newBooks
	}
}

const booksRequest = () =>{
	return {
		type: FETCH_BOOKS_REQUEST,
	}
}

const booksError = (error) =>{
	return {
		type: FETCH_BOOKS_FAILURE,
		payload: error
	}
}

const bookAddedToCart = (bookId) =>{
	return {
		type: BOOK_ADDED_TO_CART,
		payload: bookId
	}
}

const bookDeletedToCart = (bookId) =>{
	return {
		type: BOOK_DELETED_TO_CART,
		payload: bookId
	}
}
const bookDropToCart = (bookId) =>{
	return {
		type: BOOK_DROP_TO_CART,
		payload: bookId
	}
}

// const fetchBooksOld = (booksStoreService, dispatch) => () =>{
// 	dispatch(booksRequest())
// 	booksStoreService.getBooks()
// 		.then((data) =>{dispatch(booksLoaded(data))})
// 		.catch((e) =>{dispatch(booksError(e))});
// }

const fetchBooks = (booksStoreService) => () => (dispatch) =>{
	dispatch(booksRequest())
	booksStoreService.getBooks()
		.then((data) =>{dispatch(booksLoaded(data))})
		.catch((e) =>{dispatch(booksError(e))});
}


export {
	fetchBooks,
	bookAddedToCart,
	bookDeletedToCart,
	bookDropToCart
}