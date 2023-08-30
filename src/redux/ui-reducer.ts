import { AlertProps } from "@mui/material";
import { PayloadAction, createSlice} from "@reduxjs/toolkit";

interface UiState{
    messages: uiMessage[],
    current_message_id : number
}

export interface uiMessage{
    message_id: number,
    text: string,
    severity: AlertProps["severity"]
}

const initialState : UiState = {
    messages: [],
    current_message_id: 0
};



const uiReducer =  createSlice({
    name: "ui",
    initialState,
    reducers: {
        message: (state, action: PayloadAction<uiMessage>) => {
            state.current_message_id += 1
            state.messages.push( {...action.payload, message_id: state.current_message_id });
        },
        deleteMessage: (state, action: PayloadAction<number>) => {
            // tODO: validate id
            const id = state.messages.findIndex( i => i.message_id === action.payload );
            if( id >=0 ){
                // delete the message
                state.messages.splice( id );
            }
        }
        
    }
}) 

export const uiActions = uiReducer.actions;

export default uiReducer.reducer;