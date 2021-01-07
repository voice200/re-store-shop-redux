import React from 'react';
import { connect } from 'react-redux'
import './shopping-cart-table.css';
import { bookAddedToCart, bookDeletedToCart, bookDropToCart } from '../../actions';

const ShoppingCartTable = ({ items, total, onAddedToCart, onDeletedToCart, onDropToCart }) => {
    const renderRow = (item, idx) => {
        const { id, title, count, total } = item;
        return (
            <tr key={id}>
                <td>{ idx + 1 }</td>
                <td>{ title }</td>
                <td>{ count }</td>
                <td>${ total }</td>
                <td>
                    <button
                        onClick={ () => onDropToCart(id) }
                        className="btn btn-outline-danger btn-sm float-right">
                        <i className="fa fa-trash-o" />
                    </button>
                    <button
                        onClick={ () => onAddedToCart(id)  }
                        className="btn btn-outline-success btn-sm float-right">
                        <i className="fa fa-plus-circle" />
                    </button>
                    <button
                        onClick={ () => onDeletedToCart(id) }
                        className="btn btn-outline-warning btn-sm float-right">
                        <i className="fa fa-minus-circle" />
                    </button>
                </td>
            </tr>
        );
    }

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
        { items.map(renderRow) }
        </tbody>
      </table>

      <div className="total">
        Total: {total}
      </div>
    </div>
  );
};
const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal }}) => {
    return {
       items: cartItems,
       total: orderTotal
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
        onAddedToCart: (id) => dispatch(bookAddedToCart(id)),
        onDeletedToCart: (id) => dispatch(bookDeletedToCart(id)),
        onDropToCart: (id) => dispatch(bookDropToCart(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
