import { boardApiInstance } from '@/data/apiInstance';

export const postBoard = async (param) => {
    const defaultParam = {
        type: 'til',
        title: 'dummy page',
        value: '<p>write something~!</p>',
        date: null,
        category: '#study',
        preview: 'its preview',
        link: null,
        tags: null,
        status: 1,
        creatorId: 1,
        creatorName: 'ks',
        updatorId: 1,
        updatorName: 'ks',
        note: null,
    };

    try {
        const response = await boardApiInstance.post('/board', { ...defaultParam, ...param });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getBoardList = async () => {
    try {
        const response = await boardApiInstance.get('/board');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getBoardById = async (boardId) => {
    try {
        const response = await boardApiInstance.get(`/board/id/${boardId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getBoardByType = async (boardType) => {
    try {
        const response = await boardApiInstance.get(`/board/type/${boardType}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateBoardById = async (boardId, props) => {
    try {
        const response = await boardApiInstance.put(`/board/${boardId}`, props);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteBoardById = async (boardId) => {
    try {
        const response = await boardApiInstance.delete(`/board/${boardId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
