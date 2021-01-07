import * as actionsTypes from '../action-types';

const updateCartItems = (cartItems, item, idx) =>{
	if (idx === -1) {
		return [
			...cartItems,
			item
		];
	}
	return [
		...cartItems.slice(0, idx),
		item,
		...cartItems.slice(idx + 1)
	]
}

const updateCarItem = (book, item = {}) =>{
	const {
		id = book.id,
		count = 0,
		title = book.title,
		total = 0 } = item;

	return {
		id,
		title,
		count: count + 1,
		total: total + book.price
	}
}

const deletedCartItem = (id, state) =>{
	const {bookList: {books}, shoppingCart: {cartItems}} = state;
	const bookDel = cartItems.find(item => item.id === id);
	const book = books.find(item => item.id === id);
	let newState;
	if ( bookDel.count > 1 ) {
		newState = cartItems.map(item =>{
			if ( item === bookDel ) {
				item.count = item.count - 1;
				item.total = item.total - book.price;
			}
			return item;
		});

	} else {
		newState = cartItems.filter(item => item !== bookDel)
	}
	return [...newState];
}


const updateShoppingCart = (state, action) => {

	if ( state === undefined ) {
		return {
			cartItems: [],
			orderTotal: 0
		}
	}
	const { shoppingCart:{ cartItems }, bookList: {books}} = state
	switch (action.type ) {
		case actionsTypes.BOOK_ADDED_TO_CART:
			const bookId = action.payload;
			const book = books.find(book => book.id === bookId);
			const indexItem = cartItems.findIndex(({ id }) => id === bookId);
			const item = cartItems[indexItem];

			const newItem = updateCarItem(book, item)

			return {
				orderTotal: 0,
				cartItems: updateCartItems(cartItems, newItem, indexItem)
			}
		case actionsTypes.BOOK_DELETED_TO_CART:
			const bId = action.payload;

			return {
				orderTotal: 0,
				cartItems: deletedCartItem(bId, state)
			}
		case actionsTypes.BOOK_DROP_TO_CART:
			const id = action.payload;
			const newState = cartItems.filter(item => item.id !== id);

			return {
				orderTotal: 0,
				cartItems: [...newState]
			}
		default:
			return state.shoppingCart;
	}
};

export default updateShoppingCart;