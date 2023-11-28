import React, {useState, useEffect, useRef, useCallback} from 'react';
import CartGrid from './CartGrid';
import SearchBar from './SearchBar';
//import ItemGrid from './ItemGrid';
import { useItemContext } from '../context/ItemContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const CartModal = ({ showModal, totalQuant, onCancel, formattedTotalPrice }) => {
  const { setItemQuantities, allItemsWithQuantity, setAllItemsWithQuantity } = useItemContext();
  const [enteredSearchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchContainerRef = useRef(null);

  //Search bar stuff
  useEffect(() => {
    const handleClickOutsideSearch = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        !event.target.classList.contains('search-button')
      ) {
        setIsSearchVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutsideSearch);
    return () => {
      document.removeEventListener('click', handleClickOutsideSearch);
    };
  }, []);

  const handleSearchIncrement = async (searchTerm) => {
    setSearchTerm(searchTerm);
    
    if (searchTerm.trim() !== '') {
      const normalizedSearchTerm = searchTerm.toLowerCase();

      // First, try to find an exact match in item_no
      let itemToIncrement = allItemsWithQuantity.find((item) => {
        const normalizedItemNo = item.item_no.toLowerCase();
        return normalizedItemNo === normalizedSearchTerm;
      });

      // If no exact match was found in item_no, search by exact match in upc
      if (!itemToIncrement) {
        itemToIncrement = allItemsWithQuantity.find((item) => {
          const normalizedUpc = item.upc.toLowerCase();
          return normalizedUpc === normalizedSearchTerm;
        });
      }

      if (itemToIncrement) {
        handleIncrement(itemToIncrement.item_no);

        // Wait for the next render cycle using a setTimeout or a Promise
        await new Promise((resolve) => setTimeout(resolve, 0));

        const newItemElement = document.querySelector(`[data-item-no="${itemToIncrement.item_no}"]`);
        if (newItemElement) {
          newItemElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      setFilteredItems([]);
    }
  };

  
  
  
  const handleToggleSearchBar = (event) => {
    event.stopPropagation();
    setIsSearchVisible((prevIsVisible) => !prevIsVisible);
  };
  //end of search bar stuff

  const handleIncrement = useCallback((item_no) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item_no]: (prevQuantities[item_no] || 0) + 1,
    }));
    setAllItemsWithQuantity((prevItems) =>
      prevItems.map((item) =>
        item.item_no === item_no ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      )
    );
  }, []);

  const handleExtractData = () => {
    if (totalQuant > 0) {
      const itemQuantities = JSON.parse(localStorage.getItem('itemQuantities'));
      const exportData = [];
  
      Object.entries(itemQuantities).forEach(([item_no, quantity]) => {
        if (quantity > 0) {
          const itemData = allItemsWithQuantity.find((item) => item.item_no === item_no);
          if (itemData) {
            const { item_no, description, unit, unit_price, mcq } = itemData;
            const formattedPrice = parseFloat(unit_price).toFixed(2);
  
            exportData.push({
                item_no,
                description,
                formattedPrice,
                unit,
                quantity,
                mcq
            });
          }
        }
      });
      return exportData; 
    }
    return [];
  };
  

  return (
    showModal && (
      <div className="overlay">
        <div className="cart-modal">
          <button className="search-button" onClick={handleToggleSearchBar}>
            <FontAwesomeIcon icon={faSearch} className="search-icon" size="7x" />
          </button>
          {isSearchVisible && (
            <div className='cart-search-bar-pos' ref={searchContainerRef}>
              <SearchBar onSearch={handleSearchIncrement} pHolder={"exact item# or UPC"} />
            </div>
          )}

          <p className='cart-title'>
              Current Cart
          </p>
          <p className='cart-instructions'>
              *Set quantity to zero to delete item*
          </p>


          {/* Mobile display */}
          <p className='mobile-cart-title'>
              Current Cart
          </p>
          <p className='mobile-cart-instructions'>
              *Set quantity to zero to delete item*
          </p>
          {/* Mobile display end  */}


          <div className="cart-total-price">
            Total: ${formattedTotalPrice}
          </div>

          <div className="cart-list" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <CartGrid displayData={handleExtractData} />
          </div>

          <button className="cart-modal-cancel" onClick={onCancel}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default CartModal;
