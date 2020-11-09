import React from 'react';

import classes from './Order.module.css';

const Order = (props) => {
    let ingredients = [];
    for(let ingredient in props.ingredients){
        ingredients.push({
            name: ingredient,
            qty: props.ingredients[ingredient]
        });
    }
    const output = ingredients.map(el => {
        return(
            <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    padding: '5px',
                    border: '1px solid #ccc',
                    margin: '0 8px'
                }}>{el.name} ({el.qty})</span>
        )
    })

    return(
        <div className={classes.Order}>
            <p>Ingredients: {output}</p>
            <p>Price: <strong>₹{props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default Order;