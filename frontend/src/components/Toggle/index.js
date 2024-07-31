import PropTypes from 'prop-types';
import { useState } from 'react';

const Toggle = (props) => {
    const { on, onClick, interactive, ...rest } = props;
    console.log("🚀 ~ Toggle ~ on:", on)

    return (
        <label>
            <input
                type="checkbox"
                checked={on}
                className="hidden-input"
                onChange={() => {}}
                onClick={onClick}
            />
            <div
                className={`inline-block w-[70px] h-[36px] relative cursor-pointer rounded-full p-1 transition-all ${
                    on ? 'bg-green-500' : 'bg-gray-300'
                }`}
                {...rest}
            >
                <span
                    className={`transition-all w-[28px] h-[28px] bg-white rounded-full inline-block ${
                        on ? 'translate-x-[34px]' : ''
                    }`}
                ></span>
            </div>
        </label>
    );
};

Toggle.propTypes = {
    on: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Toggle;
