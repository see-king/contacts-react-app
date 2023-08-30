import { configureStore } from '@reduxjs/toolkit';
import uiReducer, {uiActions, uiMessage} from './ui-reducer';
import contactReducer, { contactStorageMiddleware, contactsActions, localStorageIndex } from './contact-reducer';
import { Contact } from '../services/contacts-service';
import { AlertProps } from '@mui/material';



// Create the Redux store
const store = configureStore({
    reducer: {
        uiReducer,
        contactReducer
    },
    // add listener to store state in local storage and retreive it
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contactStorageMiddleware)
});




// export store type
export type ReduxStateType = ReturnType< typeof store.getState>; 


// prepare and export contact action wrappers
const getAllContacts = () => store.getState().contactReducer.contacts;
const updContact =  (c: Contact) => store.dispatch( contactsActions.updateContact(c) )
const delContact =  (phone: string ) => store.dispatch( contactsActions.deleteContact(phone) )
const resetContacts =  () => store.dispatch( contactsActions.reset() )

export {getAllContacts, updContact, delContact, resetContacts}

// prepare and export ui action wrappers
const doMessage = ( text: string, severity?: AlertProps["severity"]) => store.dispatch( (d) => d(uiActions.message({text, severity} as uiMessage)) );
const delMessage = (message_id: number) => store.dispatch( uiActions.deleteMessage(message_id) );

export {doMessage, delMessage};

export default store;

// Initialize contacts once on load (attempt to fetch from localStorage)
store.dispatch( contactsActions.fetchFromLocalStorage() );

