import { MD5 } from 'crypto-js';
import { createContext, useContext, useEffect, useState } from 'react';
import searchBarIcon from '../../assets/images/history-icon-black.svg';
import AxiosAuth from '../utils/AxiosAuth';

const SearchContext = createContext();

export function useSearch() {
    return useContext(SearchContext);
}

const pickHistory = (listSuggestion, history, searchTextRaw) => {
    history.forEach((item) => {
        const x = item?.key?.split(searchTextRaw).length > 1;

        if (x) {
            listSuggestion.push({
                id: item.id,
                type: 'history',
                icon: searchBarIcon,
                text: item.key,
                url: `/search/?q=${item.key}`,
                key: item.key,
            });
        }
    });
};

const pickKeyword = (listSuggestion, keyword, searchTextRaw) => {
    // todo: update the stricture
    keyword.forEach((item) => {
        const x = item?.key?.split(searchTextRaw).length > 1;
        if (x) {
            listSuggestion.push({
                id: item.id,
                type: 'keyword',
                icon: item.icon,
                text: item.title,
                url: item.url,
                key: item.key,
            });
        }
    });
};

const pickDomainsTLDs = (listSuggestion, domainTLDs, searchTextRaw = '') => {
    let searchText =
        searchTextRaw.substring(0, 7) === 'http://' ? searchTextRaw.substring(7) : searchTextRaw;
    searchText = searchText.substring(0, 8) === 'https://' ? searchText.substring(8) : searchText;
    searchText = searchText.substring(0, 4) === 'www.' ? searchText.substring(4) : searchText;

    const regex = new RegExp('([a-z0-9\\-]+[a-z0-9]+){1,30}', 'mg');
    const x = (searchText.match(regex) || [])[0] === searchText;

    if (x) {
        domainTLDs?.forEach((ext) => {
            const id = MD5(`${searchText}.${ext}`).toString();
            listSuggestion.push({
                id,
                type: 'domain',
                icon: searchBarIcon,
                text: `${searchText}.${ext}`,
                url: `/search/?q=${searchText}.${ext}`,
                key: `${searchText}, ${ext}, ${searchText}.${ext}`,
            });
        });
    }
};

const pickLinks = (listSuggestion, links, searchTextRaw) => {
    links.forEach((item) => {
        const x = item?.key?.split(searchTextRaw).length > 1;
        if (x) {
            listSuggestion.push({
                id: item.id,
                type: 'links',
                icon: item.icon,
                text: item.title,
                url: item.url,
                key: item.key,
            });
        }
    });
};

function SearchProvider({ children }) {
    // response = {domainTLDs, links, keywords, history}

    const [searchText, setSearchText] = useState('');
    const [isAppend, setIsAppend] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [response, setResponse] = useState(null);
    const { domainTLDs = [], links = [], keywords = [], history = [] } = response || {};

    const addHistory = (item) => {
        const date = new Date().toDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        AxiosAuth.setUrl('https://io.bikiran.com/bikiran/search/put-data/')
            .post({ ...item, date })
            .then(({ data }) => {
                if (data.error === 0) {
                    setResponse((cData) => ({
                        ...cData,
                        ...data.data,
                    }));
                } else {
                    // Do Nothing
                }
            });
    };

    const removeHistory = () => {
        //
    };

    const handleSearch = (ev, navigate) => {
        ev.preventDefault();

        if (searchText.length > 0) {
            const urlPath = `/search/?q=${searchText}`;
            navigate(urlPath, { replace: true });
            const id = MD5(searchText).toString();

            addHistory({
                id,
                icon: null,
                text: searchText,
                url: urlPath,
                key: searchText,
                timeStamp: Math.round(new Date().getTime() / 1000),
            });
        }
        return () => handleSearch();
    };

    // --Collect Search Parameters
    useEffect(() => {
        AxiosAuth.setUrl('https://io.bikiran.com/bikiran/search/get-data/')
            .get()
            .then(({ data }) => {
                if (data.error === 0) {
                    setResponse(data.data);
                } else {
                    // Do Nothing
                }
            });
    }, []);

    // --Data Processing
    const searchSuggestion = [];

    // -Step1
    pickHistory(searchSuggestion, history, searchText);

    // -Step2
    pickKeyword(searchSuggestion, keywords, searchText);

    // -Step3
    pickDomainsTLDs(searchSuggestion, domainTLDs, searchText);

    // -Step4
    pickLinks(searchSuggestion, links, searchText);

    const value = {
        layout: null,
        isAppend,
        setIsAppend,
        isFocused,
        setIsFocused,
        searchSuggestion,
        searchText,
        setSearchText,
        addHistory,
        removeHistory,
        handleSearch,
    };

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export default SearchProvider;
