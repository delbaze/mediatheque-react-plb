import { createSlice } from "@reduxjs/toolkit";

const favorisSlice = createSlice({
  name: "favoris",
  initialState: { ids: [] },
  reducers: {
    basculerFavori(state, action) {
      const id = action.payload;

      const resultat = state.ids.includes(id)
        ? state.ids.filter((f) => f !== id)
        : [...state.ids, id];
      //   localStorage.setItem("favoris", JSON.stringify(resultat)); // on va utilsier redux persist
      state.ids = resultat;
    },
    viderFavoris(state) {
      state.ids = [];
    },
  },
});

export const { basculerFavori, viderFavoris } = favorisSlice.actions;
export const selectFavoris = (state) => state.favoris.ids;


export default favorisSlice.reducer;
