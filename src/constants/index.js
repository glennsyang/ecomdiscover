export const DJISYMBOL = "&symbol=DJI"

export const ONE_DAY_MS = 24 * 3600 * 1000

export const FIELD_REQUIRED = "*This field is required."
export const SELECT_MARKETPLACE = "*Please select at least one Marketplace."

export const MARKETPLACE_OPTIONS = [
    { id: 1, value: "USA", isChecked: false },
    { id: 2, value: "Canada", isChecked: false },
    { id: 3, value: "Other", isChecked: false }
]

export const customStyles = {
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