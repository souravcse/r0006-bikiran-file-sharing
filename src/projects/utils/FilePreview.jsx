import React from 'react';

function FilePreview({ type, url }) {
    if (type.search('image') === 0) {
        return <img style={{ width: '100%' }} src={url} alt="" />;
    }
    if (type === 'application/pdf') {
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        return <iframe src={url} width="100%" height="100%" />;
    }
    if (type === 'vedio') {
        return <img style={{ width: '100%' }} src={url} alt="" />;
    }
    return <img src={url} alt="Img" />;
}

export default FilePreview;
