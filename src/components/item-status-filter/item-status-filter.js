import React, { Component } from 'react';
import './item-status-filter.css';


export default class ItemStatusFilter extends Component {

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'}
    ];

    render() {
        const {filter, onFilterChange} = this.props;

        const showButtons = this.buttons.map((buttons) => {
            const isActive = filter === buttons.name;
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
           return (
               <button type="button"
                       className={`btn ${clazz}`}
                       key={buttons.name}
                        onClick={() => onFilterChange(buttons.name)}
               >
                   {buttons.label}</button>
           )
        });
        return (
            <div className="btn-group">
                {showButtons}
            </div>
        );
    }
}

