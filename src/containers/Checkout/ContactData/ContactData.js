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
               elementtype: 'input',
               elementconfig: {
                   type: 'text',
                   placeholder: 'Your Name'
               },
               value: ''
           },
           street: {
               elementtype: 'input',
               elementconfig: {
                   type: 'text',
                   placeholder: 'Your Street Address'
               },
               value: ''
           },
           zipCode: {
               elementtype: 'input',
               elementconfig: {
                   type: 'text',
                   placeholder: 'Zipcode'
               },
               value: ''
           },
           country: {
               elementtype: 'input',
               elementconfig: {
                   type: 'text',
                   placeholder: 'Country of living'
               },
               value: ''
           },
           email: {
               elementtype: 'input',
               elementconfig: {
                   type: 'email',
                   placeholder: 'Your E-Mail'
               },
               value: ''
           },
           deliveryMethod: {
               elementtype: 'select',
               elementconfig: {
                   options: [
                       { value: 'fastest', displayValue: 'Fastest'},
                       { value: 'cheapest', displayValue: 'Cheapest'}
                   ],
               },
               value: ''
           },
       },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault(); // I dont want to send req automatically, that would reload the page
        this.setState({loading: true});

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; //key value=> email: simona@mail.com
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error)
                this.setState({loading: false});
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
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
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementtype={formElement.config.elementtype}
                        elementconfig={formElement.config.elementconfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
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