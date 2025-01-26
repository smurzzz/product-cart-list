import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: (() => {
    try {
      const storedCarts = localStorage.getItem("carts"); // Fixed method name
      return storedCarts ? JSON.parse(storedCarts) : [];
    } catch {
      return [];
    }
  })(),
  totalQuantity: 0,
  productDetails: {},
  selectedProductId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity, price } = action.payload;
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      );

      if (indexProductId >= 0) {
        state.items[indexProductId].quantity += quantity;
        state.totalQuantity += quantity;
      } else {
        state.items.push({ productId, quantity, price, isToggled: false });
        state.totalQuantity += quantity;
      }
      localStorage.setItem("carts", JSON.stringify(state.items));
    },

    changeQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      );

      if (indexProductId >= 0) {
        const quantityDifference =
          quantity - state.items[indexProductId].quantity;
        state.items[indexProductId].quantity = quantity;
        state.totalQuantity += quantityDifference;
      }
      localStorage.setItem("carts", JSON.stringify(state.items));
    },

    setProductDetails(state, action) {
      const { productId, details } = action.payload;
      console.log("Setting product details for:", productId, details);
      state.productDetails[productId] = details;

      localStorage.setItem("carts", JSON.stringify(state.items));
    },

    toggleProduct(state, action) {
      const { productId } = action.payload;
      const productIndex = state.items.findIndex(
        (item) => item.productId === productId
      );

      if (productIndex >= 0) {
        state.items[productIndex].isToggled =
          !state.items[productIndex].isToggled;
        console.log(
          `Toggled product ${productId}:`,
          state.items[productIndex].isToggled
        );
      }

      localStorage.setItem("carts", JSON.stringify(state.items));
    },

    removeProduct(state, action) {
      const { productId } = action.payload;
      const product = state.items.find((item) => item.productId === productId);
      if (product) {
        state.totalQuantity -= product.quantity;
      }
      state.items = state.items.filter((item) => item.productId !== productId);

      localStorage.setItem("carts", JSON.stringify(state.items));
    },

    removeAllItems(state) {
      state.items = [];
      state.totalQuantity = 0;

      localStorage.setItem("carts", JSON.stringify(state.items));
    },
  },
});

export const {
  addToCart,
  changeQuantity,
  removeProduct,
  removeAllItems,
  setProductDetails,
  toggleProduct, // Make sure toggleProduct is exported
} = cartSlice.actions;

export default cartSlice.reducer;
