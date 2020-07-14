const $streamingServices = document.querySelector(".streaming-services");

async function indexStreamings(){
    const streamings = await apiRequest('/services', 'get');
    const $allStreamings = document.createElement('div');

    let content = "";

    await streamings.map( async obj=>{
        let checked = false;

        const favoritesStreamings = await consultLocalStorage.list();
        
        if(favoritesStreamings){
            favoritesStreamings.forEach( obj2 =>{
                if(obj2[0] === obj.name){
                    checked = true;
                }
            });
        }

        content += `<div class="streaming-card">
        <img src="${obj.url_image}"/>
        <p data-link="${obj.link}">${obj.name}</p>
        <label class="select-streaming">
            <input type="checkbox" ${ative = checked ? 'checked': 'disabled="disabled"'}/>
            <span class="check"></span>
        </label>
        </div>`;   
    })
    
    $allStreamings.classList += "all-streamings";
    $allStreamings.innerHTML = content;

    $streamingServices.append($allStreamings);
}

