import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Amount to pay: <strong>₹{props.price.toFixed(2)}</strong></p>
        {controls.map(cntrl => (
            <BuildControl 
                key={cntrl.label} 
                label={cntrl.label} 
                added={() => props.ingredientAdded(cntrl.type)}
                removed={() => props.ingredientRemoved(cntrl.type)}
                disabled={props.disabled[cntrl.type]} 
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!(props.canPurchase)}>Check Out</button>
    </div>
);

export default BuildControls;