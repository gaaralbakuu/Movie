import apiAxios from "./api.axios";

export const homeGetList = async () => {
    return await apiAxios.get("/api/home/getList");
};

export const homeRefresh = async () => {
    return await apiAxios.get("/api/home/refresh");
};

export const homeUpdateChapter = async ({ id, signal }) => {
    return await apiAxios.get(`/api/home/update-chapter?id=${id}`, { signal });
};
