import React from 'react';

function OptionBox({ children, show, setShowUBox, myWidth, customClass }) {
    console.log(show);
    return (
        <>
            <div
                tabIndex={0}
                role="button"
                className={['top-box-foreground', show ? 'show' : ''].join(' ')}
                onClick={() => {
                    setShowUBox(false);
                }}
            />
            <div
                className={[`${customClass} top-box `, show ? 'show' : ''].join(' ')}
                style={{ width: myWidth }}
            >
                <div>{children}</div>
            </div>
        </>
    );
}

export default OptionBox;
