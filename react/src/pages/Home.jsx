import { NavLink } from "react-router-dom";
import menu from "../data/menu";

function Home() {
    return (
        <>
            <div className="h-[50px] bg-gray-100 border-b border-solid border-gray-300 flex">
                <div className="flex-1"></div>
                <div className="max-w-xs w-full h-full flex flex-col justify-center items-center gap-1">
                    <div className="text-xs">Status downloading ...</div>
                    <div className="w-full">
                        <div className="h-[5px] bg-gray-300 rounded">
                            <div className="w-1/2 bg-lime-500 h-full rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="flex-1"></div>
            </div>
            <div className="flex-1"></div>
        </>
    );
}

export default Home;
