import React, { Component } from 'react';

import './item-add-form.css'

export default class ItemAddForm extends Component {

    state = {
        value: ''
    };

    onLabelChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.value !== '') {
            this.props.addItem(this.state.value);
        }
        this.setState({
            value: ''
        })
    };
   render() {

    return (
        <form className="item-add-form"
        onSubmit={this.onSubmit}>
            <input type="text"
                className="form-control"
                   placeholder="What needs to be done?"
                   onChange={this.onLabelChange}
                   value={this.state.value}
            />
            <button type="submit"
                className="btn btn-outline-dark btn-sm float-right btn-add"
            >
                Add Item
                <i className="fa fa-plus"/>
            </button>
        </form>
    )
   }
};