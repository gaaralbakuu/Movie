import { NavLink } from "react-router-dom";
import menu from "../data/menu";
import { useEffect, useState } from "react";
import { homeGetList } from "../api/api.home";
import Image from "../components/common/Image";

function Home() {
    const pathArticles = import.meta.env.VITE_API_URL + "/images/articles/";
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        homeGetList().then((res) => {
            setArticles(res.data);
        });
    }, []);

    return (
        <>
            <div className="h-[50px] bg-gray-100 border-b border-solid border-gray-300 flex dark:bg-gray-900 dark:border-gray-950 dark:text-white">
                <div className="flex-1"></div>
                <div className="max-w-xs w-full h-full flex flex-col justify-center items-center gap-1 px-3">
                    <div className="text-xs">Status downloading ...</div>
                    <div className="w-full">
                        <div className="h-[5px] bg-gray-300 rounded dark:bg-gray-700">
                            <div className="w-1/2 bg-lime-500 h-full rounded dark:bg-cyan-500"></div>
                        </div>
                    </div>
                </div>
                <div className="flex-1"></div>
            </div>
            <div className="flex-1 bg-gray-50 dark:bg-gray-800 relative">
                <div className="absolute inset-0 overflow-auto">
                    <div className="flex flex-col gap-2 divide-y divide-gray-300 dark:divide-gray-700">
                        {articles.map((item, index) => (
                            <div key={index} className="p-3 flex">
                                <div>
                                    <div className="w-[120px] pb-[150%] relative">
                                        <div className="absolute inset-0">
                                            <Image src={pathArticles + item.image}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="px-3 flex flex-col">
                                        <div className="text-xl font-thin dark:text-white">
                                            {item.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-500">
                                            {item.name_original}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
