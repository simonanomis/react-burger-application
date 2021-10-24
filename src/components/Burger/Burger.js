import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let transsformedIngredients = Object.keys(props.ingredients)
        .map((ingredientKey) => {
            return [...Array(props.ingredients[ingredientKey])].map((_, index) =>  {
                return <BurgerIngredient key={ingredientKey+index} type={ingredientKey} />
            });
        })
        .reduce((previousValue, currentValue) => {
            return previousValue.concat(currentValue);
        }, []);
    if(transsformedIngredients.length === 0) {
        transsformedIngredients = <p>Please start adding ingredients!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transsformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;