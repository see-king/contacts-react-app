import { AlertProps } from "@mui/material";
import { PayloadAction, createSlice} from "@reduxjs/toolkit";
import { Contact } from "../services/contacts-service";

interface contactsState{
    contacts: Contact[]
}


const initialState : contactsState = {
    contacts: [
            {
                phone: "12345667",
                fullName: "John Doe",
                email: "test1@test.cc",
                age: 46,
                notes: []
            },
            {
                phone: "123456674",
                fullName: "Jane Doe",
                email: "test2@test.cc",
                age: 34,
                notes: []
            }
        ]
        
};

export const localStorageIndex = "ContactAppData";



const contactReducer =  createSlice(
    {
    name: "contactsData",
    initialState: {...initialState},
    reducers: {
        updateContact: (state, action: PayloadAction<Contact>) => {
            // tODO: validate id
            const id = state.contacts.findIndex( i => i.phone === action.payload.phone );
            if( id >=0 ){
                // update the message
                state.contacts[id] = action.payload;
            } else {
                state.contacts.push( action.payload );
            }
        },

        deleteContact: (state, action: PayloadAction<string>) => {
            console.debug("deleteContact reducer called with", action.payload)
            // tODO: validate id
            const id = state.contacts.findIndex( i => i.phone === action.payload );
            if( id >=0 ){
                // delete the contact
                state.contacts.splice(id, 1);
            } else {
                throw new Error("Contact not found!")
            }
        
        },

        reset : (state) => {
            // reset comntacts to default value
            state.contacts = [...initialState.contacts]
        },

        fetchFromLocalStorage: (state) => {
            const contacts =  JSON.parse( localStorage.getItem(localStorageIndex) || 'null' );
            if( Array.isArray(contacts) ){
                state.contacts = contacts;
            }
        }
    }
}) 

export const contactStorageMiddleware = (store : any ) => (next : any) => (action : any) => {
    const result = next(action);
    

    // console.debug("\n\nStore:\n",store," \n\nResult:\n", result);


    // store to localStorage
    localStorage.setItem(localStorageIndex, JSON.stringify( store.getState().contactReducer.contacts ) );

    return result;
}

export const contactsActions = contactReducer.actions;

export default contactReducer.reducer;