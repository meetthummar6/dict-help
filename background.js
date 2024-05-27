console.log('background.js');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getDefinition') {
        const selectedText = message.text;
        console.log(selectedText); 
        console.log(sender)
        const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(async(data) => {
                const [tab]=await chrome.tabs.query({active:true,lastFocusedWindow:true})
                // Extract definition from the response data based on your chosen API
                console.log(data);
                if(data[0]?.meanings.length===0){
                    await chrome.tabs.sendMessage(tab.id,{action:"showDefinition",definition:"No definition found"});
                    return
                }
                await chrome.tabs.sendMessage(tab.id,{action:"showDefinition",data});
            })
            .catch(error => console.error(error));
    }
});