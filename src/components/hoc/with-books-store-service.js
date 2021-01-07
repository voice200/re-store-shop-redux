import React from 'react';
import { BooksStoreServiceConsumer } from '../bookstore-service-context'

const withBooksStoreService = () =>(Wrapped) =>{
	return (props) =>{
		return (
			<BooksStoreServiceConsumer>
				{
					(booksStoreService) =>{
						return (
							<Wrapped
								{...props}
								booksStoreService={booksStoreService}
							/>
							);
					}
				}
			</BooksStoreServiceConsumer>
		);
	}
}

export default withBooksStoreService;