import React, { Component } from 'react';
import Aux from '../../hoc/Auxy';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

class Layout extends Component {
  // logic to deal with sidedrawer and toolbar done in layout because it is only component
  // that has both components inside of it already
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerToggleHandler = () => {
    // using the current state to set state (whatever the opposite is currently with !)
    // this.setState({ !this.state.sideSideDrawer }) won't work because it you can't directly modify state with state
    // instead we use an anonymous function
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.sideSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
