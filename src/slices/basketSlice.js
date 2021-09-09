import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

// Create a slice
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Actions
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        basketItem => basketItem.id === action.payload.id
      );

      // make a copy of the current basket
      let newBasket = [...state.items]

      if(index >= 0) {
      //  the item exists in the basket... remove it...
        newBasket.splice(index, 1)
      } else {
        //  item doesn't exist
        console.warn(`Cannot remove the product ${action.payload.id} as it is not in the basket`)
      }

      state.items = newBasket
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0)

export default basketSlice.reducer;
