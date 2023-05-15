import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    hideNotification() {
      return null;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (content, type, timeout) => {
  return async (dispatch) => {
    const payload = {
      class: type,
      message: content,
    };
    dispatch(showNotification(payload));
    setTimeout(() => {
      dispatch(hideNotification());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
