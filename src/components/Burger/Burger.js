import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
  // looping over an state object
  // 1) loop the keys (ingredient names)
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      // console.log('ingredient type', igKey);
      // console.log('ammount of ingredient', props.ingredients[igKey]);
      // 2) loop the value (number of each ingredient added) to render amount of topping
      /* Array() is a javscript method that accepts makes an array with empty spaces
           equal to a number supplied to its arguement. */
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        // console.log('second map loop values and getting i for key', i);
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
