const api = process.env.REACT_APP_API_URL;

const ConfigApi = {
    API_APP_INIT: `${api}/api/init`,
    GET_BREADCRUMB: `${api}/manage/file/:folderSl/breadcrumb`,
    // Auth
    LOGIN: `${api}/login`,
    REGISTER: `${api}/register`,
    LOGOUT: `${api}/logout`,
    // Folder Create
    CREATE_FOLDER: `${api}/manage/file/folder/create`,
    FILE_UPLOAD: `${api}/manage/file/:folderSl/create`,
    FOLDER_UPLOAD: `${api}/manage/file/:folderSl/folder/create`,
    GET_FILE: `${api}/manage/file`,
    GET_SHARE_FILE: `${api}/manage/file/share`,
    GET_TRASH_FILE: `${api}/manage/file/trash`,
    GET_FILE_DETAIL: `${api}/manage/file/:folderSl/folder`,
    GET_HIDE_FILE_DETAIL: `${api}/manage/file/:folderSl/hide-folder`,
    HIDE_FILE_CHECK: `${api}/manage/file/hide/check`,
    CHECK_LOCK_DETAIL: `${api}/manage/file/:folderSl/lock-check`,
    GET_DETAIL: `${api}/manage/file/:fileSl/detail`,
    FILE_TRASH: `${api}/manage/file/:fileSl/trash`,
    FILE_GLOBAL_ST: `${api}/manage/file/:fileSl/global-status`,
    FILE_ACCESS_TYPE: `${api}/manage/file/:fileSl/access`,
    FILE_SHARE_SEND: `${api}/manage/file/:fileSl/share-send`,
    FILE_SHARE_SEND_NON_ACC: `${api}/manage/file/:fileSl/share-send/non-acc`,

    RENAME_FILE: `${api}/manage/file/:fileSl/rename`,
    HIDE_FILE: `${api}/manage/file/:fileSl/hide`,
    LOCK_FOLDER: `${api}/manage/file/:fileSl/lock`,
    OPEN_LOCK_FOLDER: `${api}/manage/file/:fileSl/open-lock`,
    MOVE_FILE: `${api}/manage/file/:fileSl/move`,
    COLOR_CHANGE: `${api}/manage/file/:folderSl/color-change`,
    FILE_DOWNLOAD: `${api}/manage/file/:fileSl/download`,
    FILE_RESTORE: `${api}/manage/file/:fileSl/restore`,
    FILE_REMOVE_FOREVER: `${api}/manage/file/remove/forever`,
};

export default ConfigApi;
