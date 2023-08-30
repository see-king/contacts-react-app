import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui-reducer';
import thunk from 'redux-thunk';




// Create the Redux store
const store = configureStore({
    reducer: {
        uiReducer
    },
    // use thunk middleware
    middleware: [thunk]
});


// export store type
export type ReduxStateType = ReturnType< typeof store.getState>; 


export default store;
