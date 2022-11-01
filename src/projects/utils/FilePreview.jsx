import axios from 'axios';
import React, { useState } from 'react';

function FilePreview({ type, url }) {
    const [aaa, setAaa] = useState();
    if (type === 'image/svg+xml') {
        axios
            .get(url)
            .then((response) => setAaa(response.data))
            .catch((err) => {
                console.log(err);
            });
        console.log(aaa);
        return <>{`${aaa}`}</>;
    }
    if (type?.search('image') === 0) {
        return (
            <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={url} alt="" />
        );
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
