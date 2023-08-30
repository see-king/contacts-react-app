import { Dialog, DialogProps, Typography } from "@mui/material";
import React from "react";

type ModalDialogProps = DialogProps & {
  header?: string
};

const ModalDialog: React.FC<ModalDialogProps> = (props) => {

  const {header, children, ...other} = props;
  return <Dialog {...other}>
    {header && 
    <div className="dialog-header">
      {header}
    </div>
    }
    {children}</Dialog>
};

export default ModalDialog;
