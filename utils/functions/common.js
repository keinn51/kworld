export function transHtmlToPureText(html) {
    if (typeof document === 'undefined' || typeof window === 'undefined') return '';
    // Create a temporary div element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Extract the text content from the div element
    const text = tempDiv.textContent || tempDiv.innerText;

    // Remove the temporary div from the document (optional)
    tempDiv.remove();

    return text;
}
