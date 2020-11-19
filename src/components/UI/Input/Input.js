import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
    let input = null;
    switch(props.elementType){
        case 'input':
            input = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                onChange={props.changed}
                value={props.value} />;
            break;
        case 'textarea':
            input = <textarea 
                className={classes.InputElement} 
                {...props.elementConfig} 
                onChange={props.changed}
                value={props.value} />;
            break;
        case 'email':
            input = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                onChange={props.changed}
                value={props.value} />;
            break;
        case 'select':
            input = (
                <select 
                    className={classes.InputElement} 
                    onChange={props.changed}
                    value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            input = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {input}
        </div>
    );
}

export default Input;