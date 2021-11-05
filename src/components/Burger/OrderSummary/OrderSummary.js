import React from "react";
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return (
            <li key={ingredientKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {ingredientKey}
                </span>: {props.ingredients[ingredientKey]}
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
          <p><strong>Total price {props.price.toFixed(2)}</strong></p>
          <p>Continue to checkout?</p>
          <Button buttonType="Danger" clicked={props.orderCanceled}>CANCEL</Button>
          <Button buttonType="Success" clicked={props.orderContinued}>CONTINUE</Button>
      </Auxiliary>
    );
};

export default orderSummary;