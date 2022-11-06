/* eslint-disable react/no-unknown-property */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import ConfigApi from '../../configs/ConfigApi';
import AxiosAuth from './AxiosAuth';

function DragDropFile({ setReloadId, setUploadComplete, setUploadTitle, setUploadBox, parentSl }) {
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
    const handleDrop = async (e) => {
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        setUploadBox(true);

        const { files } = e.dataTransfer;
        for (let xx = 0; xx < files.length; xx += 1) {
            setUploadTitle((oldItems) => [...oldItems, files[xx]?.name]);
        }
        for (let x = 0; x < files.length; x += 1) {
            const formData = new FormData();
            formData.append('upload_file', files[x]);
            await AxiosAuth.post(ConfigApi.FOLDER_UPLOAD.replace(':folderSl', parentSl), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    webkitRelativePath: files[x]?.webkitRelativePath,
                },
                parentSl,
            })
                .then((response) => {
                    if (response.data.error === 0) {
                        setUploadComplete((oldItemsx) => [...oldItemsx, files[x]?.name]);
                        setReloadId(Math.random);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // triggers when file is selected with click
    const handleChange = async (target) => {
        console.log(target);
        setUploadBox(true);
        const { files } = target?.target;
        for (let xx = 0; xx < files?.length; xx += 1) {
            setUploadTitle((oldItems) => [...oldItems, files[xx]?.name]);
        }
        for (let x = 0; x < files?.length; x += 1) {
            const formData = new FormData();
            formData.append('upload_file', files[x]);

            await AxiosAuth.post(ConfigApi.FILE_UPLOAD.replace(':folderSl', parentSl), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                parentSl,
            })
                .then((response) => {
                    if (response.data.error === 0) {
                        setUploadComplete((oldItemsx) => [...oldItemsx, files[x]?.name]);
                        setReloadId(Math.random);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
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
                name="file"
                id="input-file-upload"
                multiple
                onChange={handleChange}
                // webkitdirectory="true"
                // mozdirectory="true"
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
