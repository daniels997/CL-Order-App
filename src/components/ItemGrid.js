import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useItemContext } from '../context/ItemContext';

const ItemGrid = ({ category, filtered }) => {
  // global array setting
  const { setAllItemsWithQuantity } = useItemContext();

  // item and their quantities depending on the category
  const { itemQuantities, setItemQuantities } = useItemContext();

  //all items of the category
  const [items, setItems] = useState([]);
  const encodedCategory = encodeURIComponent(category);

  // Fetching items according to category input by user
  useEffect(() => {
    if (category) {
      window.scrollTo({ top: 0 });
      fetchItems(category);
    }
  }, [category]);

  const fetchItems = (category) => {
    //fetch(`http://132.148.72.142:5000/items?category=${encodedCategory}`)
    //fetch(`http://localhost:5000/items?category=${encodedCategory}`)
    fetch(`http://192.168.2.249:5000/items?category=${encodedCategory}`)
    //fetch(`https://app.cltrading.com:3000/api/items.php?category=${encodedCategory}`)
      .then((response) => response.json())
      .then((data) => {
        // Sort items based on item_order in ascending order
        data.sort((a, b) => a.item_order - b.item_order);
        setItems(data);
      })
      .catch((error) => console.error(error));
  };


  const Item = ({ itemData }) => {
    const { item_no, description, unit_price, unit, mcq } = itemData;
    const quantity = itemQuantities[item_no] || 0;
    const formattedPrice = parseFloat(unit_price).toFixed(2);
  
    // For user input editing the quantity directly
    const [editingQuantity, setEditingQuantity] = useState(false);
    const [newQuantity, setNewQuantity] = useState(quantity);

    //used to make the plus button dissapear when the input text box loads
    const [showPlusButton, setShowPlusButton] = useState(true);

    //const [imageLoadFailed, setImageLoadFailed] = useState(false);

    const inputRef = useRef(null);

    //hold down button functionality
    const [decrementInterval, setDecrementInterval] = useState(null);
    const [incrementInterval, setIncrementInterval] = useState(null);

    // const handleImageError = () => {
    //   setImageLoadFailed(true);
    // };

    // Increment and decrement button handling
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

    const handleDecrement = useCallback((item_no) => {
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item_no]: Math.max((prevQuantities[item_no] || 0) - 1, 0),
      }));
      setAllItemsWithQuantity((prevItems) =>
        prevItems.map((item) =>
          item.item_no === item_no ? { ...item, quantity: Math.max((item.quantity || 0) - 1, 0) } : item
        )
      );
      window.scrollTo({
        top: window.scrollY,
        behavior: 'smooth',
      });
    }, []);
    // Increment and decrement button Handling end

    // Functions for user inputting a quantity directly
    const handleEditQuantity = () => {
      setEditingQuantity(true);
      setNewQuantity(quantity);
      setShowPlusButton(false);
    };
  
    const handleQuantityChange = (event) => {
      const newValue = event.target.value === '' ? 0 : parseInt(event.target.value);
      setNewQuantity(Math.max(newValue, 0)); 
    };      
  
    const handleQuantitySubmit = () => {
      setEditingQuantity(false);
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item_no]: newQuantity,
      }));
      setShowPlusButton(true);
      setAllItemsWithQuantity((prevItems) =>
        prevItems.map((item) => (item.item_no === item_no ? { ...item, quantity: newQuantity } : item))
      );
    };
    
    // quantity button hold functionality
    const handleIncrementPress = () => {
      let shouldIncrement = true; 
      const intervalId = setInterval(() => {
        if (shouldIncrement) {
          handleIncrement(item_no);
        }
      }, 60);
      setIncrementInterval(intervalId);
      window.addEventListener('mouseup', () => {
        shouldIncrement = false;
      });
      window.addEventListener('mouseleave', () => {
        shouldIncrement = false; 
      });
    };
  
    const handleDecrementPress = () => {
      let shouldDecrement = true; 
      const intervalId = setInterval(() => {
        if (shouldDecrement) {
          handleDecrement(item_no);
        }
      }, 60);
      setDecrementInterval(intervalId);
      window.addEventListener('mouseup', () => {
        shouldDecrement = false; 
      });
      window.addEventListener('mouseleave', () => {
        shouldDecrement = false; 
      });
    };
    // end of button hold functionality

    return (
      <div className="item">
        {/* Grid display */}
        {/* Image Display */}
        <img
          src={`https://pavo-content-prod.s3-us-west-2.amazonaws.com/caltra-44/images/products/${encodeURIComponent(itemData.item_no.replace(/\//g, '-'))}--1.jpg`}
          alt={''}
          className="item-image"
        />
        {/* ItemDisplay */}
        <p className="item-no">{item_no}</p>

        {/* Price, unit, mastercase display container */}
        <div className="price-container">
          <p className="item-price">${formattedPrice}</p>
          <p className="divider">/</p>
          <p className="item-price">{unit}</p>
          {mcq !== '' && (
            <div className="mcqBox">
                <div className="mcqHeading">Case Quantity: </div>
                <div className="mcqNum">{mcq}</div>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="item-description">{description}</p>
  
        {/* Quantity handling with buttons, and input box */}
        <div className="quantity-container">
        {editingQuantity ? (
          <input
            type="number"
            inputMode="numeric" 
            pattern="[0-9]*"
            className="small-input"
            value={newQuantity > 0 ? newQuantity : ''}
            onChange={handleQuantityChange}
            onBlur={handleQuantitySubmit}
            onKeyDown={(event) => {
              if (event.key === 'Enter') { 
                 event.target.blur();
              }
            }}
			      ref={inputRef}
            autoFocus={editingQuantity}
            onFocus={(event) => event.target.select()}
          />
        ) : (
        <>
          {/* Conditionally render decrement button */}
          {!editingQuantity && quantity > 0 && (
          <button
            className="quantity-btn"
            onClick={(event) => {
              event.preventDefault(); // Prevent default behavior (scrolling)
              handleDecrement(item_no);
              event.target.blur();
            }}
            onMouseDown={(event) => {
              event.preventDefault(); // Prevent default behavior (scrolling)
              handleDecrementPress(item_no);
            }}
          >
            -
          </button>
          )}
          {/* Conditionally render quantity text */}
          {(editingQuantity || quantity > 0) && (
            <span
              className={`quantity-text ${!editingQuantity && 'clickable'}`}
              onClick={!editingQuantity ? handleEditQuantity : undefined}
            >
              {quantity}
            </span>
          )}
          {showPlusButton && (
          <button
            className="quantity-btn"
            onClick={(event) => {
              event.preventDefault(); // Prevent default behavior (scrolling)
              handleIncrement(item_no);
              event.target.blur();
            }}
            onMouseDown={(event) => {
              event.preventDefault(); // Prevent default behavior (scrolling)
              handleIncrementPress(item_no);
            }}
          >
            +
          </button>
        )}
        </>
        )}
      </div>
      {/* end of crazy quantity container implementation */}

    </div>
  );
};

  return (
    <>
      {category && items.map((itemData) => (
        <Item key={itemData.item_no} itemData={itemData} />
      ))}
      {filtered && filtered.map((itemData) => (
        <Item key={itemData.item_no} itemData={itemData} />
      ))}
    </>
  );
};

export default ItemGrid;