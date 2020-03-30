import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const customStyles = {
    control: styles => ({
        ...styles,
        backgroundColor: 'white',
        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        padding: '1px',
        borderColor: '#cbd5e0'
    }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px gray',
        backgroundColor: state.isSelected ? 'white' : 'white',
        color: '#2d3748',
        ':hover': {
            backgroundColor: '#f7fafc',
            color: '#4299e1',
        },
        padding: 10,
        fontSize: '14px',
    }),
    singleValue: ((provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }),
    placeholder: styles => ({ ...styles, color: '#cbd5e0' }),
}

const categories = [
    { value: "USA", label: "USA" },
    { value: "CAN", label: "Canada" },
    { value: "OTH", label: "Other" }
]

const [values, setCategories] = useState({
    selectedOption: [],
})
const handleMultiChange = selectedOption => {
    setValue('categories', selectedOption)
    setCategories({ selectedOption })
}
useEffect(() => {
    register({ name: 'categories' });
}, []);

export default ({ name, register }) => (
    <Select
        placeholder="Select Categories..."
        options={categories}
        value={values.selectedOption}
        styles={customStyles}
        //onChange={handleMultiChange}
        isMulti
    />
);