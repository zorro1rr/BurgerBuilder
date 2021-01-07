import React from 'react';
import Auxy from '../../hoc/Auxy';
import Backdrop from './Backdrop/Backdrop';

import classes from './Modal.module.css';

const modal = (props) => (
  <Auxy>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      // inline style practice (could have made a class instead)
      //  for animation on appearance.
      style={{
        transform: props.show ? 'tranSlateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  </Auxy>
);

export default modal;
