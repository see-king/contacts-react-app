import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { ViewList } from "@mui/icons-material";
import { Link } from "react-router-dom";


const NavbarComponent: React.FC = () => {
  return <AppBar >
    <Toolbar className="app-toolbar">
      <Link to="/" >
        <ViewList color="action"/>
      </Link>
    </Toolbar>
  </AppBar>
};

export default NavbarComponent;