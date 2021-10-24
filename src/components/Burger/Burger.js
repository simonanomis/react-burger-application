import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    const transsformedIngredients = Object.keys(props.ingredients)
        .map((ingredientKey) => {
            return [...Array(props.ingredients[ingredientKey])].map((_, index) =>  {
                return <BurgerIngredient key={ingredientKey+index} type={ingredientKey} />
            });
        });
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transsformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;