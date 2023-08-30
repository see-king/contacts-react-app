import { Typography, TypographyProps } from "@mui/material";
import React from "react";

type ErrorComponentProps = {
  header: string,
  text: string,
  headerProps ?: TypographyProps,
  textProps ?: TypographyProps
};

const ErrorComponent: React.FC<ErrorComponentProps> = (props) => {
  const {header, text, headerProps, textProps} = props;
  
  return <div className="error">
    <Typography variant="h1" {... headerProps || {} }>{header}</Typography>
    <Typography variant="body1" {... textProps || {} }>{text}</Typography>
  </div>;
};

export default ErrorComponent;
