import React, {Component} from "react";
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('[OrderSummary] Will Update');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingredientKey => {
                return (
                    <li key={ingredientKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {ingredientKey}
                </span>: {this.props.ingredients[ingredientKey]}
                    </li>
                );
            });

        return (
            <Auxiliary>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button buttonType="Danger" clicked={this.props.orderCanceled}>CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.orderContinued}>CONTINUE</Button>
            </Auxiliary>
        );
    }
}

export default OrderSummary;