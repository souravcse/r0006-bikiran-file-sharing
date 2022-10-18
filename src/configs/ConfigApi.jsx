const api = process.env.REACT_APP_API_URL;

const ConfigApi = {
    API_APP_INIT: `${api}/api/init`,
    // Folder Create
    LOGIN: `${api}/login`,
    // Folder Create
    CREATE_FOLDER: `${api}/manage/file/folder/create`,

    // Search
    API_DOMAIN_DATA: `${api}/search/result/`,
    API_DOMAIN_DATA_INFO: `${api}/web-info/data/`,
    API_DOMAIN_DATA_SSHOT: `${api}/web-info/screenshot/`,
};

export default ConfigApi;
