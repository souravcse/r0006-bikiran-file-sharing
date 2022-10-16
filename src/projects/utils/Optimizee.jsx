import placeholderImage from '../../../../assets/images/placeholder-image.png';

export default function Optimizee(url, maxWidth) {
    if (!url) {
        return placeholderImage;
    }

    if (maxWidth) {
        return `https://www.iopt.cc/img/e/${btoa(url)},${maxWidth}.jpg`;
    }

    return `https://www.iopt.cc/img/e/${btoa(url)}.jpg`;
}
