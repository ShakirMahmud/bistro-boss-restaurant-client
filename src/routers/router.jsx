import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order";
import Login from "../pages/authPages/Login";
import SignUp from "../pages/authPages/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/dashboard/userPages/Cart";
import AllUsers from "../pages/dashboard/adminPages/AllUsers";
import AddItems from "../pages/dashboard/adminPages/AddItems";
import AdminHome from './../pages/dashboard/adminPages/AdminHome';
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/dashboard/adminPages/ManageItems";
import UpdateItem from "../pages/dashboard/adminPages/UpdateItem";

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
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        children: [
            //User Routes
            {
                path: 'cart',
                element: <Cart/>,
            },
            {},
            {},
            {},
            {},
            // Admin Routes
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome/></AdminRoute>
            },
            {
                path: 'users',
                element: <AdminRoute><AllUsers/></AdminRoute>
            },
            {
                path: 'addItems',
                element: <AdminRoute><AddItems/></AdminRoute>
            },
            {
                path: 'manageItems',
                element: <AdminRoute><ManageItems/></AdminRoute>
            },
            {
                path: 'updateItem/:id',
                element: <AdminRoute><UpdateItem/></AdminRoute>
            },
            {},
        ]
    }
])