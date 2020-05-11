export const DJISYMBOL = "&symbol=DJI"

export const ONE_DAY_MS = 24 * 3600 * 1000

export const IMAGE_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp', 'image/gif']

export const FIELD_REQUIRED = "*This field is required."
export const VALID_EMAIL = "*Please enter a valid e-mail address."
export const VALID_PASSWORD = "*Password must be at least 12 characters long."
export const SELECT_MARKETPLACE = "*Please select at least one Marketplace."
export const SELECT_RATING_1 = "*Please select at least one star."
export const SELECT_RATING_5 = "*Please select at most 5 stars."

export const RATING_MESSAGE = [
    { stars: 0, starMessage: "" },
    { stars: 1, starMessage: "Terrible" },
    { stars: 2, starMessage: "Poor" },
    { stars: 3, starMessage: "Average" },
    { stars: 4, starMessage: "Very Good" },
    { stars: 5, starMessage: "Excellent" },
]

export const SORT_TYPES = {
    helpfulup: {
        message: 'Most Helpful Reviews',
        fn: (a, b) => a.helpful.length - b.helpful.length
    },
    helpfuldown: {
        message: 'Least Helpful Reviews',
        fn: (a, b) => b.helpful.length - a.helpful.length
    },
    ratingup: {
        message: 'Highest Rated Reviews',
        fn: (a, b) => a.rating - b.rating
    },
    ratingdown: {
        message: 'Lowest Rated Reviews',
        fn: (a, b) => b.rating - a.rating
    },
    newestup: {
        message: 'Newest Reviews',
        fn: (a, b) => {
            a = new Date(a.created)
            b = new Date(b.created)
            return a - b
        }
    },
    newestdown: {
        message: 'Oldest Reviews',
        fn: (a, b) => {
            a = new Date(a.created)
            b = new Date(b.created)
            return b - a
        }
    },
}

/*
 * React-Select custom styles
 */
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

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
export const editorModules = {
    toolbar: [
        [{ 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
export const editorFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]