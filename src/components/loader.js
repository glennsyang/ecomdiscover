import React from 'react';
import { FaCircleNotch } from 'react-icons/fa'

function Loader() {
    return (
        <div className="flex-1 flex items-center text-5xl">
            <FaCircleNotch className="flex-1 icon-spin" />
        </div>
    );
}

export default Loader;
