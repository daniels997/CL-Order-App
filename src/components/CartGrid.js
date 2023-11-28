import React, { useState, useEffect, useRef } from 'react';
import { useItemContext } from '../context/ItemContext';
//import placeHolder from '../assets/CLplaceholder.jpg';

const CartGrid = ({ displayData }) => {
  const { setAllItemsWithQuantity } = useItemContext();
  const { setItemQuantities } = useItemContext();
  const [items, setItems] = useState([]);
  const cartGridRef = useRef(null);

  useEffect(() => {
    setItems(displayData);
    if (cartGridRef.current) {
      cartGridRef.current.scrollTop = cartGridRef.current.scrollHeight;
    }
  }, [displayData]);

  const CartItem = ({ itemData }) => {
    const imageUrl = `https://pavo-content-prod.s3-us-west-2.amazonaws.com/caltra-44/images/products/${encodeURIComponent(itemData.item_no.replace(/\//g, '-'))}--1.jpg`;
    const { item_no, description, unit, quantity, formattedPrice, mcq} = itemData;
    const [editingQuantity, setEditingQuantity] = useState(false);
    const [newQuantity, setNewQuantity] = useState(quantity);
    const [showPlusButton, setShowPlusButton] = useState(true);
    //const [imageLoadFailed, setImageLoadFailed] = useState(false);
    const inputRef = useRef(null);
    const [decrementInterval, setDecrementInterval] = useState(null);
    const [incrementInterval, setIncrementInterval] = useState(null);

    // const handleImageError = () => {
    //   setImageLoadFailed(true);
    // };

    // Increment and decrement button handling
    const handleIncrement = (item_no) => {
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item_no]: (prevQuantities[item_no] || 0) + 1,
      }));
      setAllItemsWithQuantity((prevItems) =>
        prevItems.map((item) =>
          item.item_no === item_no ? { ...item, quantity: (item.quantity || 0) + 1 } : item
        )
      );
      window.scrollTo({
        top: window.scrollY,
        behavior: 'smooth',
      });
    };

    const handleDecrement = (item_no) => {
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
    };
    // Increment and decrement button Handling end

    const handleEditQuantity = () => {
      setEditingQuantity(true);
      setNewQuantity(quantity);
      setShowPlusButton(false);
    };
  
    const handleQuantityChange = (event) => {
      const newValue = event.target.value === '' ? 0 : parseInt(event.target.value);
      setNewQuantity(Math.max(newValue, 0)); // Ensure newQuantity is not negative
    };      
  
    const handleQuantitySubmit = () => {
      setEditingQuantity(false);
      // Update the quantity in the state
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item_no]: newQuantity,
      }));
      setShowPlusButton(true);
      // Update the quantity in the allItemsWithQuantity array
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
      <div className="cart-item" data-item-no={item_no}>
        <div className='cart-left'>
          <img
            //src={imageLoadFailed ? placeHolder : imageUrl}
            //alt={`Item ${item_no}`}
            src={imageUrl}
            alt={''}
            className="cart-item-image"
            //onError={handleImageError}
          />
        </div>
        
        {/* ItemDisplay */}
        <div className='cart-middle'>
          <p className="cart-item-no">{item_no}</p>

          {/* Price, unit, mastercase display container */}
          <div className="price-container">
            <p className="cart-item-price">${formattedPrice}</p>
            <p className="cart-divider">/</p>
            <p className="cart-item-price">{unit}</p>
            {mcq !== '' && (
              <div className="cart-mcqBox">
                  <div className="cart-mcqHeading">Case Quantity: </div>
                  <div className="cart-mcqNum">{mcq}</div>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="cart-item-description">{description}</p>
          <p className='cart-item-price'>Total for item: ${(formattedPrice * quantity).toFixed(2)}</p>
        </div>
        
        <div className='cart-right'>
          {/* Quantity handling with buttons, and input box */}
          <div className="cart-quantity-container">
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
              className="cart-quantity-btn"
              onClick={(event) => {
                event.preventDefault();
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
              className={`cart-quantity-text ${!editingQuantity && 'clickable'}`}
              onClick={!editingQuantity ? handleEditQuantity : undefined}
            >
              {quantity}
            </span>
          )}
          {showPlusButton && (
		        <button
              className="cart-quantity-btn"
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
    </div>
  );
};

  return (
    <div className="cart-grid" ref={cartGridRef}>
      {items.slice().reverse().map((cartItem) => (
        <CartItem key={cartItem.item_no} itemData={cartItem} />
      ))}
    </div>
    );
};

export default CartGrid;