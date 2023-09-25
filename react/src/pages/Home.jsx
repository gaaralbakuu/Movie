import { NavLink } from "react-router-dom";
import menu from "../data/menu";
import { useCallback, useEffect, useRef, useState } from "react";
import { homeGetList, homeRefresh, homeUpdateChapter } from "../api/api.home";
import Image from "../components/common/Image";
import Scrollbars from "react-custom-scrollbars";
import "react-virtualized/styles.css";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import toast from "react-hot-toast";

function Home() {
    const pathArticles = import.meta.env.VITE_API_URL + "/images/articles/";
    const [articles, setArticles] = useState([]);
    const [fetchings, setFetchings] = useState([]);
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
            homeGetList().then((res) => {
                setArticles(res.data);
                setRefreshing(false);
            });
        });
    }

    function handleFetch(id) {
        return () => {
            let tempFetchs = [...fetchings];
            const findItem = tempFetchs.filter((item) => item.id === id);
            if (findItem.length === 0) {
                const controller = new AbortController();
                tempFetchs.push({ id, controller: controller });
                homeUpdateChapter({ id, signal: controller.signal }).then(
                    (res) => {
                        toast("Update list chapter success", {
                            type: "success",
                        });
                        setFetchings((state) =>
                            state.filter((item) => item.id !== id)
                        );
                    }
                );
            }
            setFetchings(tempFetchs);
        };
    }

    function handleRemoveFetch(id) {
        return () => {
            let tempFetchs = [...fetchings];
            const findItem = tempFetchs.filter((item) => item.id === id);
            if (findItem.length === 1) {
                findItem[0].controller.abort();
                tempFetchs = tempFetchs.filter((item) => item.id !== id);
            }
            setFetchings(tempFetchs);
        };
    }

    useEffect(() => {
        if (listRef.current)
            listRef.current.Grid._scrollingContainer = scrollRef.current.view;
        homeGetList().then((res) => {
            setArticles(res.data);
        });
    }, []);

    const isFetch = useCallback(
        (id) => {
            if (fetchings.length === 0) return false;
            if (fetchings.findIndex((item) => item.id === id) === -1)
                return false;
            return true;
        },
        [fetchings]
    );

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
                                        rowHeight={206}
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
                                                className={`p-3 flex relative ${
                                                    index !== 0
                                                        ? "border-t border-solid border-gray-200 dark:border-gray-700"
                                                        : ""
                                                }`}
                                            >
                                                {isFetch(
                                                    articles[index].id
                                                ) && (
                                                    <div
                                                        className={`absolute inset-0 bg-white/50 dark:bg-black/50 z-10 backdrop-blur-[1px] flex items-center justify-center`}
                                                    >
                                                        <div className="flex flex-col gap-2">
                                                            <div className="text-sm dark:text-white flex items-center">
                                                                <div role="status">
                                                                    <svg
                                                                        aria-hidden="true"
                                                                        className="w-4 h-4 mr-2 text-gray-200 animate-spin fill-blue-600"
                                                                        viewBox="0 0 100 101"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                            fill="currentColor"
                                                                        />
                                                                        <path
                                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                            fill="currentFill"
                                                                        />
                                                                    </svg>
                                                                    <span className="sr-only">
                                                                        Loading...
                                                                    </span>
                                                                </div>
                                                                Waiting for
                                                                fetching...
                                                            </div>
                                                            <div className="flex justify-center">
                                                                <div
                                                                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 leading-[0] rounded-md cursor-pointer flex gap-1 items-center py-1"
                                                                    onClick={handleRemoveFetch(
                                                                        articles[
                                                                            index
                                                                        ].id
                                                                    )}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            1.5
                                                                        }
                                                                        stroke="currentColor"
                                                                        className="w-4 h-4"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M6 18L18 6M6 6l12 12"
                                                                        />
                                                                    </svg>

                                                                    <div className="mb-0.5">
                                                                        CANCEL
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
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
                                                    <div className="px-3 flex flex-col h-full">
                                                        <div className="flex-1">
                                                            <div className="text-xl font-thin dark:text-white">
                                                                {
                                                                    articles[
                                                                        index
                                                                    ].name
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-500">
                                                                {
                                                                    articles[
                                                                        index
                                                                    ]
                                                                        .name_original
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <div className="bg-lime-400 hover:bg-lime-500 text-lime-900 dark:bg-orange-500 rounded-md px-2 py-1 dark:text-white text-sm flex gap-1 items-center cursor-pointer dark:hover:bg-orange-600">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    stroke="currentColor"
                                                                    className="w-4 h-4"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                                                    />
                                                                </svg>
                                                                <div>Watch</div>
                                                            </div>
                                                            <div
                                                                className="bg-gray-400 hover:bg-gray-500 text-black dark:bg-gray-500 rounded-md px-2 py-1 dark:text-white text-sm flex gap-1 items-center cursor-pointer dark:hover:bg-gray-600"
                                                                onClick={handleFetch(
                                                                    articles[
                                                                        index
                                                                    ].id
                                                                )}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    stroke="currentColor"
                                                                    className="w-4 h-4"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                                                                    />
                                                                </svg>
                                                                <div>Fetch</div>
                                                            </div>
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
