import React, { Component } from "react";
import BuildControls from "../../components/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal";
import Aux from "../../hoc/Auxy";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  // this is old school syntax...
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }

  /* now by using class properties with an arrow function we are 
      able use state without declaring the constructor
      ----IMPORTANT THE REMEMBER:----
   THE ARROW FUNCTION IS WHAT GIVES US "THIS" BINDING TO ACCESS OUR STATE IN OUR FUNCTIONS */

  state = {
    ingredients: null,
    //Burgers start at $4
    totalPrice: 4,
    // logic to make our order now button clickable.
    purchasable: false,
    // Logic to make our Modal appear/disappear
    purchasing: false,
    // logic for dealing with loading spinner
    loading: false,
    error: false,
  };

  //dynmaically import ingredients from firebase
  componentDidMount() {
    axios
      .get(
        "https://react-burger-fbfdc-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchasedState(ingredients) {
    /* Instead of making a copy of state we are going to using the
    new state from out add/remove handlers we feed as an arguement. Just relying on that method's setState
    was giving a bug that was making this function use the old not-updated state
    */

    // Make keys array we can .map()
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        //using bracket notation return the value of each key
        return ingredients[igKey];
        //reduce that array into a total.
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    //setting purchasabled to true or false based on ingredients total
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchasedState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount < 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtraction;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchasedState(updatedIngredients);
  };

  //function to make modal appear
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  //function that lets us click out of the backdrop and cancel order
  purchasedCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('you continue');
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      // in a real app you would verify price on backend to ensure it is not manipulated by the user
      price: this.state.totalPrice,
      customer: {
        name: "Justin Howard",
        address: {
          street: "1234 Test Street",
          zip: 90210,
          country: "United States",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    // orders.json is specific to firebase
    axios
      .post("/orders.json", order)
      .then((response) => this.setState({ loading: false, purchasing: false }))
      .catch((error) => this.setState({ loading: false, purchasing: false }));
  };

  render() {
    // disabling button if ingredient state is less than 1.
    // make copy of the state
    const disabledInfo = {
      ...this.state.ingredients,
    };
    // for ..in loop iterates over keys of object
    for (let key in disabledInfo) {
      //we change the prop to a boolian based on wheather the it's value is < 0
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded </p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchasedCanceled={this.purchasedCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasedCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
