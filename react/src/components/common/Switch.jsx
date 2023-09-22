import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function Switch({ checked, onChange }) {
    return (
        <>
            <input
                id="dark-mode"
                type="checkbox"
                className="hidden [&:checked+label>div]:ml-[50%] [&:checked+label]:bg-lime-500 [&:checked+label]:dark:bg-cyan-500"
                checked={checked}
                onChange={onChange}
            />
            <label
                htmlFor="dark-mode"
                className="inline-block w-[60px] h-[30px] rounded-3xl bg-gray-300 relative transition-[background] p-[2px]"
            >
                <div className="w-[26px] h-[26px] rounded-full bg-white absolute transition-[margin-left]"></div>
            </label>
        </>
    );
}

Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Switch;
