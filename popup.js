chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'showDefinition') {
        const definition = message.definition;
    // ... Your code to create an element and display the definition text
    const definitionElement = document.createElement('div');
    definitionElement.textContent = definition;
    // Append the element to a suitable location in the DOM
    document.body.appendChild(definitionElement);
    }
});