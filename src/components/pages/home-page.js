import React from 'react';
import BookList from '../book-list';
import ShoppingCartTable from '../shopping-cart-table';

const HomePage = () => {
	return (
		<div>
			<h2>Home Page </h2>
			<BookList/>
			<ShoppingCartTable />
		</div>);
}
export default HomePage;