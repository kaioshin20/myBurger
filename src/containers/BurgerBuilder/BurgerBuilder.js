import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 10.50,
    cheese: 20.02,
    meat: 70.36,
    bacon: 80.99
}

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 30,
        purchasable: false,
        purchased: false,
        loading: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((total, el) => {
                return total + el;
            }, 0)
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchased: true});
    }

    purchaseRemovedHandler = () => {
        this.setState({purchased: false});
    }

    purchaseContinueHandler = () => {
        // alert('You have CONTINUED, hmm nice burger');
        this.setState({
            loading: true
        });
        const myorder = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                this.setState({loading: false, purchased: false})
            })
            .catch(err => {
                this.setState({loading: false, purchased: false})
            });
    }

    render(){
        let disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        };
        let orderSummary = <OrderSummary 
                                ingredients={this.state.ingredients}
                                price={this.state.totalPrice}
                                purchaseCancelled={this.purchaseRemovedHandler}
                                purchaseContinue={this.purchaseContinueHandler} />;
        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchased} modalClosed={this.purchaseRemovedHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    price={this.state.totalPrice}
                    canPurchase={this.state.purchasable}
                    buyNow={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);