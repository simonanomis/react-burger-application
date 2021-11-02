import React from "react";
import Auxiliary from '../../../hoc/Auxiliary'

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
          <p>Continue to checkout?</p>
      </Auxiliary>
    );
};

export default orderSummary;