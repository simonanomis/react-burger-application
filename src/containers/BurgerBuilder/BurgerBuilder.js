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
import * as actionTypes from "../../store/actions/actionTypes";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    //relevant for our UI state only-> whether we want to display something or not
    isOrdering: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get(
        "https://react-burger-http-app-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true });
      });
  }

  orderingHandler = () => {
    this.setState({ isOrdering: true });
  };

  orderCancelHandler = () => {
    this.setState({ isOrdering: false });
  };

  orderContinueHandler = () => {
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

    let burger = this.state.error ? (
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

    if (this.state.loading) {
      orderSummary = <Spinner />;
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (name) =>
      dispatch(burgerBuilderActions.addIngredient(name)),
    onRemoveIngredient: (name) =>
      dispatch(burgerBuilderActions.removeIngredient(name)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
