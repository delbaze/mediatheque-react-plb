import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import favoris from "./favorisSlice";

const reducerPrincipal = combineReducers({
  favoris,
});

const configurationPersistance = {
  key: "mediatheque",
  storage,
  whitelist: ["favoris"],
};

const reducerPersiste = persistReducer(configurationPersistance, reducerPrincipal);

export const store = configureStore({
  reducer: reducerPersiste,
  middleware: (parDefaut) =>
    parDefaut({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);






// import { configureStore } from "@reduxjs/toolkit";

// import favoris from "./favorisSlice";

// export const store = configureStore({
//   reducer: {
//     favoris,
//   },
// });
