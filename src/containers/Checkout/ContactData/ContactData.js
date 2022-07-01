import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state = {
       orderForm: {
           name: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your Name'
               },
               value: 'Bella'
           },
           street: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your Street Address'
               },
               value: 'Some Street in Spain'
           },
           zipCode: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Zipcode'
               },
               value: '100077'
           },
           country: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Country of living'
               },
               value: 'Spain'
           },
           email: {
               elementType: 'input',
               elementConfig: {
                   type: 'email',
                   placeholder: 'Your E-Mail'
               },
               value: 'bella@gmail.com'
           },
           deliveryMethod: {
               elementType: 'select',
               elementConfig: {
                   options: [
                       { value: 'fastest', displayValue: 'Fastest'},
                       { value: 'cheapest', displayValue: 'Cheapest'}
                   ]
               },
               value: 'bella@gmail.com'
           },
       },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,

            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', orderData)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error)
                this.setState({loading: false});
            });
    }

    render () {
        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config}
                        value={formElement.config.value} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;