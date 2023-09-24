export const getYearMonthDate = (date) => {
    if (!date || date instanceof Date === false) return null;
    return `${date.getFullYear()}+${date.getMonth() + 1}+${date.getDate()}`;
};
