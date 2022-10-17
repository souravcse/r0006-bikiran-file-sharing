import SearchBarIcon from '../../assets/images/Search-icon-black.svg';

function SearchInputSection() {
    return (
        <div className="home-search-group-div">
            <div className="home-search-input-group">
                <form>
                    <input type="text" className="" placeholder="Search in Drive" />
                </form>

                <button type="button">
                    <img src={SearchBarIcon} alt="Search" />
                </button>
            </div>
        </div>
    );
}

export default SearchInputSection;
