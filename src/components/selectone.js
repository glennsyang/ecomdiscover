import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';

const countriesSelected = [
    { label: "USA", value: "USA" },
    { label: "CAN", value: "Canada" },
    { label: "OTH", value: "Other" }
]

export default class CreatableSingle extends Component {
    handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };
    handleInputChange = (inputValue, actionMeta) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };
    render() {
        return (
            <CreatableSelect
                isClearable
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
                options={countriesSelected}
            />
        );
    }
}