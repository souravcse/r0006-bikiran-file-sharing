import React, { useEffect, useRef } from 'react';

function FixedHeaderControl({ children }) {
    const ref = useRef();

    useEffect(() => {
        const obj = document.getElementById('root');

        const handleScroll = () => {
            if (ref?.current) {
                if (obj.scrollTop > 5) {
                    ref.current.classList.add('position-high');
                } else {
                    ref.current.classList.remove('position-high');
                }
            }
        };

        obj.addEventListener('scroll', handleScroll);
        return () => obj.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="web-header" ref={ref}>
                {children}
            </div>
            <div className="web-header-gap" />
            {/* {gap && } */}
        </>
    );
}

export default FixedHeaderControl;
