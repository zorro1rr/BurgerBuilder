import React, { Component } from 'react';
import Auxy from '../../../hoc/Auxy';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // this could be a functional component, doesnt have to be a class
  // turned into a class during debugging with Modal
  // componentDidUpdate() {
  //   console.log('[ordersummary.js] will update');
  // }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey, i) => {
        return (
          <li key={igKey + i}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Auxy>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' clicked={this.props.purchasedCanceled}>
          CANCEL
        </Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxy>
    );
  }
}

export default OrderSummary;
