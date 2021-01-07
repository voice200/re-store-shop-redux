import React, { Component} from 'react';
import './book-list.css'
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { withBooksStoreService } from '../hoc'
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import {bindActionCreators} from 'redux'

const BookList = ({books, onAddedToCart}) =>{

	return (<ul className="book-list">
		{ books.map( book => {
			const { id, ...bookProps } = book;
			return (
				<li key={ id }>
					<BookListItem
						book={ bookProps }
						onAddedToCart={() => onAddedToCart(id)}/>
				</li>
			);
		} )
		}
	</ul>);
}


class BookListContainer extends Component{

	componentDidMount() {
		this.props.fetchBooks();
	}

	render() {
		const {  books, loading, error, onAddedToCart } = this.props
		if ( loading ) {
			return <Spinner/>
		}
		if ( error ) {
			return <ErrorIndicator error={error}/>
		}

		return <BookList books={ books } onAddedToCart={onAddedToCart}/>

	}
}
const mapStateToProps = ( { bookList: { books, loading, error } }) =>{
	return {
		books,
		loading,
		error
	}
}


const mapDispatchToProps = (dispatch, { booksStoreService }) =>{
	return bindActionCreators({
		fetchBooks: fetchBooks(booksStoreService),
		onAddedToCart: bookAddedToCart
	}, dispatch)
}

export default compose(withBooksStoreService(),
	connect(mapStateToProps, mapDispatchToProps))(BookListContainer);