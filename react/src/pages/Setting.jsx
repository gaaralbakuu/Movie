import { NavLink } from "react-router-dom";
import menu from "../data/menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../store/reducers/mainSlice";
import Switch from "../components/common/Switch";

function Setting() {
    const navigate = useNavigate();
    const { darkMode } = useSelector((state) => state.main);
    const dispatch = useDispatch();

    function handleBack() {
        navigate(-1);
    }

    function handleToggleDarkMode() {
        localStorage.setItem("theme", !darkMode ? "dark" : "light");
        dispatch(setDarkMode(!darkMode));
    }

    return (
        <>
            <div className="h-[50px] bg-gray-100 border-b border-solid border-gray-300 flex dark:bg-gray-900 dark:border-gray-950 dark:text-white">
                <div className="flex-1 flex items-center">
                    <div className="px-3">
                        <div
                            className="px-3 py-0.5 rounded border border-solid border-blue-400 text-blue-400 text-sm cursor-pointer hover:bg-blue-400 hover:text-white"
                            onClick={handleBack}
                        >
                            Back
                        </div>
                    </div>
                </div>
                <div className="flex-shrink h-full flex flex-col justify-center items-center gap-1 text-xl font-thin">
                    Setting
                </div>
                <div className="flex-1"></div>
            </div>
            <div className="flex-1 bg-gray-50 dark:bg-gray-800">
                <div className="p-3">
                    <div className="mb-2 font-bold text-sm text-gray-500 dark:text-white">
                        General
                    </div>
                    <div className="rounded-lg bg-white border border-solid border-gray-200 flex flex-col divide-y divide-gray-300 dark:bg-gray-700 dark:border-gray-900 dark:text-white">
                        <div className="flex justify-between items-center">
                            <div className="p-3 font-thin">
                                Dark mode system
                            </div>
                            <div className="px-3 leading-[0]">
                                <Switch
                                    checked={darkMode}
                                    onChange={handleToggleDarkMode}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Setting;
