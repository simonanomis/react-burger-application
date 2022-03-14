import React, {Component} from "react";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 1.5,
    meat: 2,
    bacon: 1.8
}


class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        isOrdering: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('https://react-burger-http-app-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                console.log(error)
                this.setState({error: true})
            });
    }

    orderingHandler = () => {
        this.setState({isOrdering: true});
    }

    orderCancelHandler = () => {
        this.setState({isOrdering: false});
    }

    orderContinueHandler = () => {
        // this.setState({loading: true});
        // const orderData = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Bella',
        //         address: {
        //             street: 'Nekoja ulica',
        //             zipCode: '1000',
        //             country: 'Macedonia'
        //         },
        //         email: 'test@test.com',
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json', orderData)
        //     .then(response => {
        //         this.setState({loading: false, isOrdering: false});
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.setState({loading: false, isOrdering: false});
        //     });
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(
                encodeURIComponent(i) + 
                '=' + 
                encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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

        let orderSummary = null;

        let burger = this.state.error ? <p>The ingredients can not be loaded!</p> : <Spinner />

        if(this.state.ingredients) {
            burger = (
                <Auxiliary>
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
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                orderCanceled={this.orderCancelHandler}
                orderContinued={this.orderContinueHandler}/>
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Auxiliary>
                <Modal show={this.state.isOrdering} modalClosed={this.orderCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);