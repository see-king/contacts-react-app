import React from "react";
import { Outlet } from "react-router";
import NavbarComponent from "../navbar";
import Notifications from "../notificatioins";

type Props = {
};

const AppTemplate: React.FC<Props> = () => {
  return <div className="template">
    <NavbarComponent />
    <Outlet/>
    <Notifications />
  </div>;
};

export default AppTemplate;
