import { boardApiInstance } from '@/data/apiInstance';

export const postBoard = async (param) => {
    const defaultParam = {
        type: 'til',
        title: '새로운 페이지',
        value: '<p>적어보겠나?</p>',
        date: null,
        category: '#study',
        preview: '미리보기',
        link: null,
        tags: null,
        status: 1,
        creatorId: 1,
        creatorName: '경수리',
        updatorId: 1,
        updatorName: '경수리',
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
    console.log(`[UPDATE BOARD]`, boardId, props);
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
