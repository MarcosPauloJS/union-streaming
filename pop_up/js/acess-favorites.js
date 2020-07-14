async function acessStreaming(event){
    if(event.path[0].className === 'all-streamings') return;
    const $elementStreming = await event.path[event.path.length - 8]
    const link = $elementStreming.dataset.link

    try {
        chrome.tabs.update({url: link,  active: true})
    }
    catch{
        console.log('Infelismente ocorreu um erro ao abrir o serviço de streaming');
    }
}
