import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import Setting from "../pages/Setting";

export default createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "category",
                element: <Home />,
            },
            {
                path: "bookmark",
                element: <Home />,
            },
            {
                path: "setting",
                element: <Setting />,
            },
        ],
    },
]);
