import { NavLink } from "react-router-dom";
import menu from "../data/menu";
import { useEffect, useRef, useState } from "react";
import { homeGetList, homeRefresh } from "../api/api.home";
import Image from "../components/common/Image";
import Scrollbars from "react-custom-scrollbars";
import "react-virtualized/styles.css";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import toast from "react-hot-toast";

function Home() {
    const pathArticles = import.meta.env.VITE_API_URL + "/images/articles/";
    const [articles, setArticles] = useState([]);
    const [isRefreshing, setRefreshing] = useState(false);
    const [isFetching, setFetching] = useState(false);

    const listRef = useRef();
    const scrollRef = useRef();

    function handleScroll(e) {
        if (listRef.current) listRef.current.Grid._onScroll(e);
    }

    function handleRefresh() {
        setRefreshing(true);
        homeRefresh().then((res) => {
            toast("Refresh successfully", {
                type: "success",
            });
            setRefreshing(false);
        });
    }

    useEffect(() => {
        if (listRef.current)
            listRef.current.Grid._scrollingContainer = scrollRef.current.view;
        homeGetList().then((res) => {
            setArticles(res.data);
        });
    }, []);

    return (
        <>
            <div className="h-[50px] bg-gray-100 border-b border-solid border-gray-300 flex dark:bg-gray-900 dark:border-gray-950 dark:text-white">
                <div className="flex-1"></div>
                <div className="flex-grow">
                    {/* <div className="text-xs">Status downloading ...</div>
                    <div className="w-full">
                        <div className="h-[5px] bg-gray-300 rounded dark:bg-gray-700">
                            <div className="w-1/2 bg-lime-500 h-full rounded dark:bg-cyan-500"></div>
                        </div>
                    </div> */}
                </div>
                <div className="flex-1 flex justify-end items-center">
                    <div className="px-3">
                        <div
                            className={`px-3 py-0.5 rounded border border-solid border-cyan-400 text-sm cursor-pointer bg-cyan-400 text-white flex gap-2 items-center select-none ${
                                isRefreshing
                                    ? "!bg-gray-400 !border-gray-400 pointer-events-none"
                                    : ""
                            }`}
                            onClick={handleRefresh}
                        >
                            <div>Update</div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={`w-4 h-4 ${
                                    isRefreshing ? "animate-spin" : ""
                                }`}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-gray-50 dark:bg-gray-800 relative">
                <div className="absolute inset-0 overflow-auto">
                    <AutoSizer className="!w-full !h-full">
                        {({ height, width }) => (
                            <Scrollbars
                                ref={scrollRef}
                                onScroll={handleScroll}
                                autoHide
                                autoHideTimeout={1000}
                                autoHideDuration={200}
                                renderThumbVertical={({ style, ...props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...style,
                                            borderRadius: 3,
                                        }}
                                        className="bg-gray-400 dark:bg-cyan-500"
                                    />
                                )}
                                renderTrackVertical={({ style, ...props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...style,
                                            right: 2,
                                            bottom: 2,
                                            top: 2,
                                            zIndex: 99,
                                            width: 4,
                                        }}
                                    />
                                )}
                            >
                                <div className="flex flex-col gap-2 divide-y divide-gray-300 dark:divide-gray-700">
                                    <List
                                        style={{
                                            overflowX: "visible",
                                            overflowY: "visible",
                                            outline: "none",
                                        }}
                                        width={width}
                                        height={height}
                                        rowCount={articles.length}
                                        rowHeight={205}
                                        rowRenderer={({
                                            key, // Unique key within array of rows
                                            index, // Index of row within collection
                                            isScrolling, // The List is currently being scrolled
                                            isVisible, // This row is visible within the List (eg it is not an overscanned row)
                                            style, // Style object to be applied to row (to position it)
                                        }) => (
                                            <div
                                                key={key}
                                                style={style}
                                                className="p-3 flex"
                                            >
                                                <div>
                                                    <div className="w-[120px] pb-[150%] relative">
                                                        <div className="absolute inset-0">
                                                            <Image
                                                                src={
                                                                    pathArticles +
                                                                    articles[
                                                                        index
                                                                    ].image
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="px-3 flex flex-col">
                                                        <div className="text-xl font-thin dark:text-white">
                                                            {
                                                                articles[index]
                                                                    .name
                                                            }
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-500">
                                                            {
                                                                articles[index]
                                                                    .name_original
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        ref={listRef}
                                    />
                                </div>
                            </Scrollbars>
                        )}
                    </AutoSizer>
                </div>
            </div>
        </>
    );
}

export default Home;
