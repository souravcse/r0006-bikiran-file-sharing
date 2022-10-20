import React from 'react';
import FileIcon from '../assets/images/fileIcon.svg';
import ImgIcon from '../assets/images/ImgIcon.svg';
import PdfIcon from '../assets/images/PdfIcon.svg';
import VideoIcon from '../assets/images/VideoIcon.svg';

function FilesIcons({ type }) {
    if (type.search('image') === 0) {
        return <img src={ImgIcon} alt="Img" />;
    }
    if (type === 'application/pdf') {
        return <img src={PdfIcon} alt="Img" />;
    }
    if (type === 'vedio') {
        return <img src={VideoIcon} alt="Img" />;
    }
    return <img src={FileIcon} alt="Img" />;
}

export default FilesIcons;
