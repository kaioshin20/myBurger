import React from 'react';

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
            <p>Continue to checkout?</p>
        </div>
    )
}

export default OrderSummary;