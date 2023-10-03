export const getYearMonthDate = (date) => {
    if (!date || date instanceof Date === false) return null;
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};
