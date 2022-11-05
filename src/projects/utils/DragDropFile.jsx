/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function handleFile(files) {
    console.log(files.length);
}

function DragDropFile() {
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);

    // handle drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = async ({ target }) => {
        console.log(target);
    };

    // const handleDrop = (e) => {
    //     console.log(e);
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setDragActive(false);
    //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    //         handleFile(e.dataTransfer.files);
    //     }
    // };

    // triggers when file is selected with click
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input
                ref={inputRef}
                type="file"
                id="input-file-upload"
                multiple
                onChange={handleChange}
            />
            <label
                id="label-file-upload"
                htmlFor="input-file-upload"
                className={dragActive ? 'drag-active' : ''}
            >
                <div>
                    <p>Drag and drop your file here or</p>
                    <button className="upload-button" onClick={onButtonClick}>
                        Upload a file
                    </button>
                </div>
            </label>
            {dragActive && (
                <div
                    id="drag-file-element"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                />
            )}
        </form>
    );
}

export default DragDropFile;
