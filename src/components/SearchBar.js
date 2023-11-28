import React, {useState, useRef, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { placeholder } from '@babel/types';

const SearchBar = ({ onSearch, pHolder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm('');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={pHolder}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        ref={inputRef}
      />
      <button className="submit-search" onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} className="submit-search-icon" size="7x" />
      </button>
    </div>
  );
};

export default SearchBar;
