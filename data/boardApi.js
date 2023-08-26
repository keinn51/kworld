import apiInstance from '@/data/apiInstance';

export const getBoardList = async () => {
    try {
        const response = await apiInstance.get('/board');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getBoardById = async (boardId) => {
    try {
        const response = await apiInstance.get(`/board/id/${boardId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getBoardByType = async (boardType) => {
    try {
        const response = await apiInstance.get(`/board/type/${boardType}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
