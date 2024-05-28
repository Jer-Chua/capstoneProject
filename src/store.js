import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userReducer';
import globalReducer from './reducer/globalReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        global: globalReducer
      }
});

export default store;