// import { configureStore, createStore } from "@reduxjs/toolkit";
// import saveSliceReducer from "./slice/Save";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from 'redux-persist/lib/storage' 

// const persistConfig = {
//   key: 'root',
//   storage,
// }
 
// const persistedReducer = persistReducer(persistConfig, saveSliceReducer)

// const store = configureStore({
//   reducer: {
//     save: persistedReducer,
//   },
// });

// export const configurePersistedStore = () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }

// export default store;



import { configureStore } from "@reduxjs/toolkit";
import saveSliceReducer from "./slice/Save";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, saveSliceReducer)

const store = configureStore({
  reducer: {
    save: persistedReducer,
  },
});

export const getPersistor = () => {
  const persistor = persistStore(store);
  return persistor;
}

export default store;
