import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const myorder = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            deliveryMethod: 'fastest',
            customer: {
                name: 'Rajat Cambo',
                address: {
                    street: 'ABC',
                    pinCode: '115596',
                    country: 'India'
                },
                email: 'rajat@gmail.com'
            }
        };
        axios.post('/orders.json', myorder)
            .then(resp => {
                this.setState({loading: false})
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false})
            });
    }

    render(){
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Tell us where you live</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;