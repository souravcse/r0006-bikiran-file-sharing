/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef, useState } from 'react';
import { icons, uploadIcon } from '../../configs/Icons';
import ImageUploadModal from '../components/ImageUploadModal';
import InstOption from './InstOption';

function ImgOptions({ showOptions, setShowOptions }) {
    const [openModal, setOpenModal] = useState(null);
    const [image, setImage] = useState('');

    const inputFile = useRef();
    const onButtonClick = () => {
        inputFile.current.click();
    };

    const handleFileUpload = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            // const filename = files[0].name;

            // const parts = filename.split('.');
            // const fileType = parts[parts.length - 1];
            // console.log('fileType', fileType);
            setImage(files[0]);
        }
        console.log('imageimage', image && true);
    };

    const handleCloseClick = () => {
        setImage(null);
        setOpenModal(null);
    };

    if (openModal && image) {
        return <ImageUploadModal handleCloseClick={handleCloseClick} />;
    }

    return (
        <InstOption show={showOptions} setShow={setShowOptions}>
            <span role="button" tabIndex={-1} onClick={() => setOpenModal(true)}>
                <img src={uploadIcon.iconUploadImage} alt="upload Icon" />{' '}
                <input
                    style={{ display: 'none' }}
                    // accept=".zip,.rar"
                    ref={inputFile}
                    onChange={handleFileUpload}
                    type="file"
                />
                <span onClick={() => onButtonClick()}>Upload Image</span>
            </span>
            <span>
                <img src={icons.iconTakeSelfie} alt="Selfie Icon" /> <span>Take Selfie</span>
            </span>
        </InstOption>
    );
}

export default ImgOptions;
