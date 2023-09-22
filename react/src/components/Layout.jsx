import React from "react";
import { Outlet } from "react-router-dom";
import menu from "../data/menu";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { setDarkMode } from "../store/reducers/mainSlice";

function Layout() {
    const { darkMode } = useSelector((state) => state.main);
    const dispatch = useDispatch();

    useEffect(() => {
        // if (
            
        // ) {
        //     dispatch(setDarkMode(true));
        // } else {
        //     dispatch(setDarkMode(false));
        // }
    }, []);

    useLayoutEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className="flex h-full">
            <div className="max-w-xl w-full mx-auto flex flex-col shadow">
                <div className="flex-1 flex flex-col">
                    <Outlet />
                </div>
                <div className="bg-gray-100 border-t botder-solid border-gray-300 flex justify-around dark:bg-gray-900 dark:border-gray-950">
                    {menu.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className="flex flex-col items-center py-2 user-select-none"
                        >
                            {({ isActive }) => (
                                <>
                                    <div
                                        className={`${
                                            isActive
                                                ? "text-cyan-600 dark:text-cyan-400"
                                                : "text-gray-600 dark:text-white"
                                        }`}
                                    >
                                        {isActive ? item.iconActive : item.icon}
                                    </div>
                                    <div
                                        className={`text-xs ${
                                            isActive
                                                ? "text-cyan-600 dark:text-cyan-400"
                                                : "text-gray-600 dark:text-white"
                                        }`}
                                    >
                                        {item.name}
                                    </div>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Layout;
