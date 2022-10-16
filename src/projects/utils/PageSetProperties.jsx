export default function PageSetProperties(dispatch, title, description, keywords, moveTop = true) {
    document.title = (title ? `${title} || ` : '') + process.env.REACT_APP_COMPANY_TITLE;

    if (moveTop) {
        window.scrollTo(0, 0);
    }
}
