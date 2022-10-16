import React, { useEffect, useRef } from 'react';
import { icons } from '../../configs/Icons';

function InstOption({ children, show, setShow }) {
    const ref = useRef();

    useEffect(() => {
        function handelClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                setShow(false);
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handelClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handelClickOutside);
        };
    }, [ref, setShow]);

    if (!show) {
        return false;
    }

    return (
        <div className="inst-option-pop" ref={ref}>
            <img src={icons.iconShape} alt="shape" />
            <div className="inst-option">
                {children.map((item) => {
                    if (item.props.clickable === 'off') {
                        return item;
                    }
                    return (
                        <div className="clickable" key={Math.random()}>
                            {item}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default InstOption;
