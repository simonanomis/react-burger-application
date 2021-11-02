import React, {Component} from "react";
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 1.5,
    meat: 2,
    bacon: 1.8
}


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0
        },
        totalPrice: 5,
        purchasable: false,
        isOrdering: false
    }

    orderingHandler = () => {
        this.setState({isOrdering: true});
    }

    orderCancelHandler = () => {
        this.setState({isOrdering: false});
    }

    orderContinueHandler = () => {
        alert('Please continue!');
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(ingredientKey => {
            return ingredients[ingredientKey];
        }).reduce((sum, element) => {
            return sum + element;
        }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients)
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0 //{salad:true, meat:false..}
        }

        return (
            <Auxiliary>
                <Modal show={this.state.isOrdering} modalClosed={this.orderCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        orderCanceled={this.orderCancelHandler}
                        orderContinued={this.orderContinueHandler}>
                    </OrderSummary>
                </Modal>
               <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.orderingHandler}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;