import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";
import { error } from "autoprefixer/lib/utils";

class BurgerBuilder extends Component {
  state = {
    //relevant for our UI state only-> whether we want to display something or not
    isOrdering: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  orderingHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ isOrdering: true });
    } else {
      this.props.history.push("/auth");
    }
  };

  orderCancelHandler = () => {
    this.setState({ isOrdering: false });
  };

  orderContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, element) => {
        return sum + element;
      }, 0);
    return sum > 0;
  }

  render() {
    const disableInfo = {
      ...this.props.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0; //{salad:true, meat:false..}
    }

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>The ingredients can not be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disableInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.orderingHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          orderCanceled={this.orderCancelHandler}
          orderContinued={this.orderContinueHandler}
        />
      );
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.isOrdering}
          modalClosed={this.orderCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    error: state.burgerReducer.error,
    isAuthenticated: state.authReducer.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (name) =>
      dispatch(burgerBuilderActions.addIngredient(name)),
    onRemoveIngredient: (name) =>
      dispatch(burgerBuilderActions.removeIngredient(name)),
    onInitIngredients: () =>
      dispatch(burgerBuilderActions.fetchIngredientsInitially()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
