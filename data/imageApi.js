import { ImageApiInstance } from '@/data/apiInstance';

export const postImage = async (formData) => {
    try {
        const response = await ImageApiInstance.post('/upload', formData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
