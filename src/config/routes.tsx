import { RouteProps } from "react-router";
import ErrorComponent from "../components/common/error-component";
import Contacts from "../components/pages/contacts";


type CustomRouteProps = RouteProps & {
    // This optional field can be used to limit users 
    // to specific sets of routes based on their credentials
    credentials ?: string[]
}


const routes : CustomRouteProps[] = [
    {
        
        path : "/",
        Component: Contacts
        
    },
    {
        path: "*",
        element: <ErrorComponent header="Error 404" text="Page not found!" />        
    }
]
export type {CustomRouteProps};

export default routes;