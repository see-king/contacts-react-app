import React from "react";
import { uiMessage } from "../../../redux/ui-reducer";
import { connect } from "react-redux";
import { ReduxStateType } from "../../../redux/store";
import { Alert } from "@mui/material";

type Props = {
  messages: uiMessage[]
};

const Notifications: React.FC<Props> = ({messages}) => {
  return <ul className="notifications">
    {messages.map( message => <li className="item"> <Alert severity={message.severity || "error"}>{message.text}</Alert></li> )}
  </ul>;
};

const stateToProps = (state: ReduxStateType ) => ({
  messages: state.uiReducer.messages
})

export default connect( stateToProps ) (Notifications);
