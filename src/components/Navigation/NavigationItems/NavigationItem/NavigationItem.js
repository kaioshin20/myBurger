import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link} 
            exact
            activeClassName={classes.Active}>{props.children}
        </NavLink>
    </li>
);

export default NavigationItem;