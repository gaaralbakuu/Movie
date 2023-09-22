import apiAxios from "./api.axios";

export const homeGetList = async () => {
    return await apiAxios.get("/api/getList");
};
