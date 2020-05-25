import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients"

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(keyVal => {
            return [...Array(props.ingredients[keyVal])].map((keyValue, index) => {
                return <BurgerIngredient key={keyVal + index} type={keyVal} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {(transformedIngredients.length === 0) ? <p>Add ingredients</p> : transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;