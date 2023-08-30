import React  from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "../../config/routes";
import AppTemplate from "../common/template";





const Main = (  ) => {
    

    return (
        
        <BrowserRouter>
            <Routes>
                <Route
                    element={ <AppTemplate />}
                >
                {routes.map( route => <Route key={route.path} {...route} />)}
                </Route>
            </Routes>
        </BrowserRouter>
        
    )   
}

export default Main;