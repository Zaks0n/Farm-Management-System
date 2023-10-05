import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import addproductReducer from "./features/products/addSlice";
import handleCart from "./features/cart/handleCart";
// import { loadState, saveState } from "./localStorage";
import getProdListReducer from "./features/products/getProdSlice";
//import { persistStore, persistReducer } from 'redux-persist';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        addproduct: addproductReducer,
        cart: handleCart,
        getProdList: getProdListReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;