import { certApiInstance } from './apiInstance';

export const checkPassword = async (_password) => {
    await certApiInstance.post('/cert', { password: _password });
};
