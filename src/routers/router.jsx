import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order";
import Login from "../pages/authPages/Login";
import SignUp from "../pages/authPages/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/dashboard/cart/Cart";
import Cart2 from "../pages/dashboard/cart/Cart2";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: '/menu',
                element: <Menu/>
            },
            {
                path: '/order',
                element: <Order/>,
                children: [
                    {
                        path: '/order/:category',
                        element: <Order/>
                    },
                ]
            },
            
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            },

        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard/>,
        children: [
            {
                path: 'cart',
                element: <PrivateRoute><Cart/></PrivateRoute>
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
        ]
    }
])