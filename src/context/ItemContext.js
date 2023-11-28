import React, { createContext, useState, useContext, useEffect } from 'react';

const ItemContext = createContext();

export const ItemContextProvider = ({ children }) => {
  const [itemQuantities, setItemQuantities] = useState(() => {
    // Load itemQuantities from Local Storage if available, or set to an empty object
    const storedItemQuantities = localStorage.getItem('itemQuantities');
    return storedItemQuantities ? JSON.parse(storedItemQuantities) : {};
  });
  const [allItemsWithQuantity, setAllItemsWithQuantity] = useState([]);

  useEffect(() => {
    // Load allItemsWithQuantity from Local Storage if available
    const storedAllItemsWithQuantity = localStorage.getItem('allItemsWithQuantity');
    if (storedAllItemsWithQuantity) {
      setAllItemsWithQuantity(JSON.parse(storedAllItemsWithQuantity));
    }
  }, []);

  useEffect(() => {
    // Save itemQuantities to Local Storage whenever it changes
    localStorage.setItem('itemQuantities', JSON.stringify(itemQuantities));
  }, [itemQuantities]);

  useEffect(() => {
    // Save allItemsWithQuantity to Local Storage whenever it changes
    localStorage.setItem('allItemsWithQuantity', JSON.stringify(allItemsWithQuantity));
  }, [allItemsWithQuantity]);

  return (
    <ItemContext.Provider
      value={{ itemQuantities, setItemQuantities, allItemsWithQuantity, setAllItemsWithQuantity }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItemContext must be used within an ItemContextProvider');
  }
  return context;
};

// GLOBAL
// FUNCTIONALITY
// HERE
// THEY HAVE ACCESS TO GLOBAL ITEM ARRAY WITH ALL QUANTS

export const calculateTotalQuantity = (itemQuantities) => {
  const totalQuantity = Object.values(itemQuantities).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return totalQuantity;
};

export const calculateTotalPrice = (itemQuantities, allItemsWithQuantity) => {
  const allItemNumbers = Object.keys(itemQuantities);
  let totalPrice = 0;

  for (const itemNo of allItemNumbers) {
    // Assuming you have an array of items with their corresponding prices
    const item = allItemsWithQuantity.find((item) => item.item_no === itemNo);
    if (item) {
      const { unit_price } = item;
      const quantity = itemQuantities[itemNo] || 0;
      totalPrice += parseFloat(unit_price) * quantity;
    }
  }

  const formattedTotalPrice = totalPrice.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return { numericTotalPrice: totalPrice.toFixed(2), formattedTotalPrice };
};
