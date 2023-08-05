export function transHtmlToPureText(html) {
    if (typeof document === 'undefined' || typeof window === 'undefined') return '';
    // Create a temporary div element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Extract the text content from the div element
    const text = tempDiv.textContent || tempDiv.innerText;

    // Remove the temporary div from the document (optional)
    tempDiv.remove();

    return text || '';
}

export const getObjExcludingKeys = (myObj, keysToExclude) => {
    if (!myObj || !keysToExclude) return {};
    return Object.keys(myObj)
        .filter((key) => !keysToExclude.includes(key))
        .reduce((obj, key) => {
            obj[key] = myObj[key];
            return obj;
        }, {});
};
