export function formatDateToYYYYMMDD(date) {
    if (!(date instanceof Date)) {
        alert('Invalid input. Please provide a valid Date object.');
        return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
