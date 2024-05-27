document.addEventListener('mouseup', (event) => {
    if (window.getSelection().toString().trim() !== '') {
        const selectedText = window.getSelection().toString().trim();
        chrome.runtime.sendMessage({ action: 'getDefinition', text: selectedText });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'showDefinition') {
        window.getSelection().removeAllRanges();
        const info = message.data;
        const lineElement = document.createElement('div');
        const closeElement = document.createElement('button');
        closeElement.textContent = 'Close';
        closeElement.style.backgroundColor = 'red';
        closeElement.style.color = 'black';
        closeElement.style.fontWeight = 'bold';
        closeElement.style.fontSize = '16px';
        closeElement.style.border = 'none';
        closeElement.style.padding = '10px 15px';
        closeElement.style.borderRadius = '5px';
        closeElement.style.cursor = 'pointer';
        closeElement.style.marginTop = '12px';
        closeElement.style.float = 'right';
        closeElement.style.marginRight = '12px';

        closeElement.addEventListener('click', () => {
            document.body.removeChild(lineElement);
        });
        lineElement.appendChild(closeElement);
        const wordElement = document.createElement('div');
        wordElement.textContent = info[0].word;
        wordElement.style.fontWeight = 'bold';
        wordElement.style.color = 'blue';
        wordElement.style.marginBottom = '10px';
        wordElement.style.marginTop = '10px';
        wordElement.style.marginLeft = '10px';
        wordElement.style.textAlign = 'center';
        wordElement.style.fontSize = '50px';
        wordElement.style.fontFamily = 'Arial, sans-serif';

        lineElement.appendChild(wordElement);
        const originElement = document.createElement('div');
        originElement.textContent = info[0].origin;
        lineElement.appendChild(originElement);
        for (let i = 0; i < info[0].meanings.length; i++) {
            const meaningElement = document.createElement('div');
            meaningElement.textContent = info[0].meanings[i].partOfSpeech;
            meaningElement.style.fontWeight = 'bold';
            lineElement.appendChild(meaningElement);
            for (let j = 0; j < info[0].meanings[i].definitions.length; j++) {
                const definitionElement = document.createElement('div');
                const exampleElement = document.createElement('div');
                const synonymsElement = document.createElement('div');
                const antonymsElement = document.createElement('div');
                definitionElement.textContent = info[0].meanings[i].definitions[j].definition;
                exampleElement.textContent = info[0].meanings[i].definitions[j].example || 'No example found';
                synonymsElement.textContent = info[0].meanings[i].definitions[j].synonyms[0] || 'No synonyms found';
                antonymsElement.textContent = info[0].meanings[i].definitions[j].antonyms[0] || 'No antonyms found';
                lineElement.appendChild(definitionElement);
                if(exampleElement.textContent !== 'No example found') lineElement.appendChild(exampleElement);
                if(synonymsElement.textContent !== 'No synonyms found') lineElement.appendChild(synonymsElement);
                if(antonymsElement.textContent !== 'No antonyms found') lineElement.appendChild(antonymsElement);
                lineElement.appendChild(document.createElement('br'));
                definitionElement.style.fontWeight = 'bold';
                definitionElement.style.color = 'blue';
                exampleElement.style.fontStyle = 'italic';
                synonymsElement.style.fontStyle = 'italic';
                antonymsElement.style.fontStyle = 'italic';

            }
        }

        // Set line properties (thickness, color, position) using CSS styles
        lineElement.style.width = '80vw';
        lineElement.style.height = '80vh'; // Adjust as needed
        lineElement.style.backgroundColor = 'white';
        lineElement.style.borderRadius = '1%';
        lineElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        lineElement.style.color = 'black';
        lineElement.style.position = 'fixed'; // Absolute positioning allows flexible placement
        lineElement.style.top = '50%'; // Adjust as needed
        lineElement.style.left = '50%'; // Adjust as needed
        lineElement.style.transform = 'translate(-50%, -50%)';
        lineElement.style.zIndex = '9999'; // Set a higher z-index to ensure it appears above other elements
        lineElement.style.overflow = 'auto';
        lineElement.style.textAlign = 'center';
        lineElement.style.padding = '10px';
        lineElement.style.fontSize = '16px';



        // Append the line element to the desired location in the DOM (e.g., near selected text)
        document.body.appendChild(lineElement);

    }
})

