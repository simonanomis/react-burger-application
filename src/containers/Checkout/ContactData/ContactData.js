import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {

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
        this.setState({loading: true});
        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Bella',
                address: {
                    street: 'Nekoja ulica',
                    zipCode: '1000',
                    country: 'Macedonia'
                },
                email: 'test@test.com',
            },
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
        let form = (
            <form>
                <Input inputtype="input" type='text' name='name' placeholder="Your name"/>
                <Input inputtype="input" type='email' name='email' placeholder="Your email"/>
                <Input inputtype="input" type='text' name='street' placeholder="Street"/>
                <Input inputtype="input" type='text' name='postal' placeholder="Your postal code"/>
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