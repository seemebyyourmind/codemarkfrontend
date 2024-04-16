import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    petItems: [], // Sản phẩm cho thú cưng
    stuffItems: [], // Sản phẩm thông thường
  },
  reducers: {
    addToPetCart: (state, action) => {
      const existingItem = state.petItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        state.petItems.push(action.payload);
      }
    },

    removeFromPetCart: (state, action) => {
      state.petItems = state.petItems.filter(
        (item) => item.id !== action.payload
      );
    },
    addToStuffCart: (state, action) => {
      const existingItem = state.stuffItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        state.stuffItems.push(action.payload);
      }
    },

    removeFromStuffCart: (state, action) => {
      state.stuffItems = state.stuffItems.filter(
        (item) => item.id !== action.payload
      );
    },
    setCartData: (state, action) => {
      state.petItems = action.payload.petItems || [];
      state.stuffItems = action.payload.stuffItems || [];
    },
    updatePetCartOnLoginSuccess: (state, action) => {
      state.petItems = action.payload || [];
    },
    updateStuffCartOnLoginSuccess: (state, action) => {
      state.stuffItems = action.payload || [];
    },
    logOutCart: (state) => {
      state.stuffItems = [];
      state.petItems = [];
    },
    updateStuffQuantity: (state, action) => {
      const { index, newQuantity } = action.payload;
      state.stuffItems[index].number = newQuantity;
    },
    updateHandleAddToCart: (state, action) => {
      const index = state.petItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.stuffItems[index].number = state.stuffItems[index].number + 1;
    },
  },
});

export const {
  addToPetCart,
  removeFromPetCart,
  addToStuffCart,
  removeFromStuffCart,
  setCartData,
  updatePetCartOnLoginSuccess,
  updateStuffCartOnLoginSuccess,
  logOutCart,
  updateStuffQuantity,
  updateHandleAddToCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const selectCart = (state) => state.cart;
