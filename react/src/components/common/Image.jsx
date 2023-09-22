import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function Image({ src }) {
    const [isLoading, setLoading] = useState(true);

    const handleLoad = (e) => {
        setLoading(false);
    };

    return (
        <>
            {isLoading && (
                <div className="bg-gray-300 animate-pulse w-full h-full rounded"></div>
            )}
            <img
                src={src}
                className={`object-cover w-full h-full rounded-md ${
                    isLoading ? "hidden" : "visible"
                }`}
                onLoad={handleLoad}
            />
        </>
    );
}

Image.propTypes = {};

export default Image;
