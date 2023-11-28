import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPaperPlane, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import smallLogo from './assets/SmallLogo.png';

import CategoryList from './components/CategoryList';
import SearchBar from './components/SearchBar';
import ItemGrid from './components/ItemGrid';
import CustomerModal from './components/CustomerModal';
import CartModal from './components/CartModal';
import Welcome from './components/Welcome';

import { useItemContext, calculateTotalQuantity, calculateTotalPrice } from './context/ItemContext';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  // allItemsWithQuantity is a global array for all items
  const { itemQuantities, setItemQuantities, allItemsWithQuantity, setAllItemsWithQuantity } = useItemContext();

  // Calculate the total quantity and price of all items
  const totalQuantity = calculateTotalQuantity(itemQuantities);
  const { numericTotalPrice, formattedTotalPrice } = calculateTotalPrice(itemQuantities, allItemsWithQuantity);

  /* Category and global items fetch and effect */
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  // This is to enable clicking outside of category list to close it
  const [isCategoryListVisible, setIsCategoryListVisible] = useState(false);
  const categoryListRef = useRef(null);

  //search bar stuff
  const [enteredSearchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchContainerRef = useRef(null);

  // Modal Implementation for pop up menus such as customer, reset, and cart pop up
  const [showResetModal, setShowResetModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);


  // Show welcome page if no category is selected
  useEffect(() => {
    setShowWelcome(!selectedCategory); 
  }, [selectedCategory]);

  // Start of fetching categories and global items and category effects
  useEffect(() => {
    fetchCategories();
    fetchAllItemsAndInitializeQuantity();
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const fetchCategories = () => {
    //fetch('http://132.148.72.142:5000/categories')
    //fetch('http://localhost:5000/categories')
    fetch('http://192.168.2.249:5000/categories')
    //fetch('https://app.cltrading.com:3000/api/categories.php')
      .then((response) => response.json())
      .then((data) => {
        const sortedCategories = data.slice().sort((a, b) => a.localeCompare(b));
        setCategories(sortedCategories);
      })
      .catch((error) => console.error(error));
  };

  const fetchAllItemsAndInitializeQuantity = () => {
    //fetch('http://132.148.72.142:5000/all-items')
    //fetch('http://localhost:5000/all-items')
    fetch('http://192.168.2.249:5000/all-items')
    //fetch('https://app.cltrading.com:3000/api/all-items.php')
      .then((response) => response.json())
      .then((data) => {
        // Initialize the quantity for all items to zero
        const itemsWithQuantity = data.map((itemData) => ({
          ...itemData,
          quantity: 0,
        }));
        setAllItemsWithQuantity(itemsWithQuantity);
      })
      .catch((error) => console.error(error));
  };
  /* End of fetching categories and global items */
  



  const handleLogoClick = () => {
    setShowWelcome(true); 
    setSelectedCategory(null);
  };

  // Handle Events for Category stuff
  const handleDocumentClick = (event) => {
    if (
      categoryListRef.current &&
      !categoryListRef.current.contains(event.target) &&
      !event.target.classList.contains('hamburger-button')
    ) {
      setIsCategoryListVisible(false);
    }
    if (event.target.classList.contains('search-button')) {
      setIsCategoryListVisible(false);
    }
  };

  const handleToggleCategoryList = (event) => {
    event.stopPropagation();
    setIsCategoryListVisible((prevIsVisible) => !prevIsVisible);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
    setFilteredItems([]);
    setIsCategoryListVisible(false);
  };

  const getTrendingItems = () => {
    const trendingCategory = categories.find(category => category.includes('@'));
    return trendingCategory || '';
  }
  
  const getNewItems = () => {
    const newCategory = categories.find(category => category.includes('#'));
    return newCategory || '';
  }
  // end of category list functionality






  //search bar handle event and effect
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

  const handleToggleSearchBar = (event) => {
    event.stopPropagation();
    setIsSearchVisible((prevIsVisible) => !prevIsVisible);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() !== '') {
      const filtered = allItemsWithQuantity.filter((item) => {
        const itemNoMatches = item.item_no.toLowerCase().includes(searchTerm.toLowerCase());
        const upcMatches = item.upc.toLowerCase().includes(searchTerm.toLowerCase());
        const descriptionMatches = item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return itemNoMatches || upcMatches || descriptionMatches;
      });
      console.log('Filtered items: ', filtered);
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
    setIsSearchVisible(false);
    setShowWelcome(false);
  };
  
  //end of search functions








  //Pop up functionality for reset
  const handleOpenResetModal = () => {
    if (totalQuantity > 0) {
      setShowResetModal(true);
    } else {
      alert('Cart is already empty.');
    }
  }

  const handleConfirmReset = () => {
    setItemQuantities({});
    setSearchTerm('');
    setFilteredItems([]);
    localStorage.setItem('itemQuantities', JSON.stringify({}));
    setShowResetModal(false);
  };

  const handleCloseResetModal = () => {
    setShowResetModal(false);
  };
  //End of pop up functionality for reset








  // Pop up for cart
  const handleOpenCartModal = () => {
    setShowCartModal(true);
  };

  const handleCartClose = () => {
    setShowCartModal(false);
  };
  // End of customer pop up menu functionality







  // Pop up for customer
  const handleOpenCustomerModal = () => {
    if (totalQuantity > 0 && numericTotalPrice >= 200) {
      setShowCustomerModal(true);
    } 
    else if (totalQuantity <= 0){
      alert('Cart is empty. Add items to your cart before proceeding.');
    }
    else {
      alert('Minimum purchase of $200 required. Please add more items.')
    }
  };

  const handleCloseCustomerModal = () => {
    setShowCustomerModal(false);
  };
  // End of customer pop up menu functionality









  //Main App which is super awesome
  return (
    <div className="App">
      <div className="App-header">
        {/* Category */}
        <button className="hamburger-button" onClick={handleToggleCategoryList}>
          <FontAwesomeIcon icon={faBars} className="hamburger-icon" size="7x" />
        </button>
        {isCategoryListVisible && (
          <div ref={categoryListRef}>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
        )}

        {/* Search Bar stuff */}
        <button className="search-button" onClick={handleToggleSearchBar}>
          <FontAwesomeIcon icon={faSearch} className="search-icon" size="7x" />
        </button>
        {isSearchVisible && (
          <div className='search-bar-pos' ref={searchContainerRef}>
            <SearchBar onSearch={handleSearch} pHolder={"Search Item # or UPC"} />
          </div>
        )}

        {/* logo */}
        <div className="logo-container"onClick={handleLogoClick}>
          <img
            className="App-logo"
            src="https://pavo-content-prod.s3-us-west-2.amazonaws.com/caltra-44/images/logo/medium/logo.png"
            alt="Logo"
          />
          <img
            src={smallLogo}
            alt="Smaller Logo"
            className="small-logo"
          />
        </div>

        { /* Total Price display */}
        <div className="total-price">
          Total: ${formattedTotalPrice}
        </div>

        {/* reset button */}
        <button className="reset-button" onClick={handleOpenResetModal}>
          Empty Cart
        </button>
        {showResetModal && (
          <>
            <div className="overlay" onClick={handleCloseResetModal} />
            <div className="reset-modal">
              <p style={{ fontSize: '26px' }}>WARNING!</p>
              <p style={{ fontSize: '26px' }}>Your entire order will be lost</p>
              <p style={{ fontSize: '26px' }}>Are you sure you want to empty cart?</p>
              <button className="modal-button-reset" onClick={handleConfirmReset}>Empty Cart</button>
              <button className="modal-button-cancel" onClick={handleCloseResetModal}>Cancel</button>
            </div>
          </>
        )}

        {/* Cart button */}
        <button className="cart-button" onClick={handleOpenCartModal}>
          <FontAwesomeIcon icon={faShoppingCart} size="2x"/>
        </button>
        <CartModal
          showModal={showCartModal}
          totalQuant={totalQuantity}
          onCancel={handleCartClose}
          formattedTotalPrice={formattedTotalPrice}
        />

        {/* Export button */}
        <button className="export-button" onClick={handleOpenCustomerModal}>
          <FontAwesomeIcon icon={faPaperPlane} size="2x"/>
        </button>
        <CustomerModal
          showModal={showCustomerModal}
          onCancel={handleCloseCustomerModal}
        />

        {/* Red bubble quantity display */}
        {totalQuantity > 0 && (
          <div className="quantity-bubble">
            {totalQuantity}
          </div>
        )}
      </div>

      {showWelcome && (
        <Welcome 
          newItems={getNewItems}
          trendingItems={getTrendingItems} 
        />
      )}

      <div className="item-list">
        {selectedCategory && !enteredSearchTerm && (
          <ItemGrid category={selectedCategory} />
        )}
        {enteredSearchTerm && filteredItems.length > 0 && !showWelcome && (
          <ItemGrid filtered={filteredItems} />
        )}
      </div>
      {enteredSearchTerm && filteredItems.length === 0 && (
        <p style={{ 
          fontSize: '26px',
          fontWeight: 'bold', 
          }}>
          Search term does not match any items
        </p>
      )}
    </div>
  );
};

export default App;
