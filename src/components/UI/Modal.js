import React, { Component } from 'react';
import Auxy from '../../hoc/Auxy';
import Backdrop from './Backdrop/Backdrop';

import classes from './Modal.module.css';

class Modal extends Component {
  // prevents OrderSummary.js from updating unless order Now button is clicked
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }
  // componentDidUpdate() {
  //   console.log('model.js will update');
  // }
  render() {
    return (
      <Auxy>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          // inline style practice (could have made a class instead)
          //  for animation on appearance.
          style={{
            transform: this.props.show ? 'tranSlateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Auxy>
    );
  }
}
export default Modal;
