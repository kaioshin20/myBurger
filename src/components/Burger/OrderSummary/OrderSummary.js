import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const summary = Object.keys(props.ingredients)
        .map(keyVal => {
            return (
                <li key={keyVal}><span style={{textTransform: 'capitalize'}}>{keyVal}:</span> {props.ingredients[keyVal]}</li>
            );
        });

    return (
        <div>
            <h3>Order Summary</h3>
            <p>Here is your burger fiasta !</p>
            <ul>
                {summary}
            </ul>
            <p>Continue to checkout?    <strong>₹{props.price.toFixed(2)}</strong></p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
        </div>
    )
}

export default OrderSummary;