$buttonShowFavorites = document.querySelector('.button-showfavorites');

let $showStreamings = false;

$buttonShowFavorites.addEventListener('click', ()=>{
    if(!$showStreamings){
        showAllStreamings();
        $showStreamings = true;
    }
    else{
        $allStreamings = document.querySelector('.streaming-services >.all-streamings');
        $allStreamings.remove();
        $showStreamings = false;
    }
})




function addFavorite(){
    $allStreamings = document.querySelector('.streaming-services >.all-streamings');

    $allStreamings.addEventListener('click', async (event)=>{
        if(event.path[0].className === 'all-streamings') return;
        // pega o elemento total de serviço clicado atraves de event buble com o path;
        const $elementStreming = await event.path[event.path.length - 7]

        if($elementStreming.childNodes[5].childNodes[1].checked === false){
            await consultLocalStorage.save(
                $elementStreming.childNodes[3].textContent,
                $elementStreming.childNodes[1].src,
                $elementStreming.childNodes[3].dataset.link,
            );

            $elementStreming.childNodes[5].childNodes[1].checked = true;
        }
        else{
            await consultLocalStorage.delete(
                $elementStreming.childNodes[3].textContent,
                $elementStreming.childNodes[1].src,
                $elementStreming.childNodes[3].dataset.link,
            );

            $elementStreming.childNodes[5].childNodes[1].checked = false;
        }

        listFavorite()
    })
}


async function listFavorite(){
    const $favoritesStreamings = document.querySelector('.streaming-services >.favorites-streamings >.wraper');
    const myFavorites = await consultLocalStorage.list();

    if(!myFavorites){
        $favoritesStreamings.innerHTML = '<p class="empty">Você ainda não adicionou nenhum serviço de streaming a sua lista ;-;</p>';
        return;
    }

    if(myFavorites){
        let content = '';

        await myFavorites.map(obj=>{
            content += `<div class="streaming-card" draggable="true" data-link="${obj[2]}">
                <img draggable="false" src="${obj[1]}"/>
                <p draggable="false">${obj[0]}</p>
            </div>`
        }) 

        $favoritesStreamings.innerHTML = content;
        $favoritesStreamings.addEventListener('click', e => acessStreaming(e));
        createDropAndDrop()
    }   
}

function createDropAndDrop(){
    let cards = document.querySelectorAll('.streaming-card');
    let wraperDropZone = document.querySelector('.streaming-services >.favorites-streamings >.wraper');

    cards.forEach( card =>{
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('drag', drag);
        card.addEventListener('dragend', dragEnd);
    })

    wraperDropZone.addEventListener('dragenter', dragEnter);
    wraperDropZone.addEventListener('dragover', dragOver);
    wraperDropZone.addEventListener('dragleave', dragLeave);
    wraperDropZone.addEventListener('drop', drop);

}

function dragStart(){
    this.classList.add('is-dragging')
    let cards = document.querySelectorAll('.streaming-card');
    cards.forEach( card =>{
        card.classList.add('in-dragged-event'); 
        })
    }
    
    function drag(item){
        const selectedItem = item.target,
        list = selectedItem.parentNode,
        x = event.clientX,
    y = event.clientY;
    
    selectedItem.classList.add('being-dragged');
    let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
    
    if (list === swapItem.parentNode) {
        swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
        list.insertBefore(selectedItem, swapItem);
    }
}

async function dragEnd(){
    this.classList.remove('is-dragging')
    this.classList.remove('being-dragged');
    let cards = document.querySelectorAll('.streaming-card');
    let updateOrder = "";
    await cards.forEach( async card =>{
        card.classList.remove('in-dragged-event');
        updateOrder += (`${card.childNodes[3].textContent},${card.childNodes[1].src},${card.dataset.link},`);
    })
    window.localStorage.setItem("my-favorites", updateOrder);
}
function dragEnter(){
}
function dragOver(){

}

function dragLeave(){
}

function drop(e){
    e.target.classList.remove('drag-sort-active');
}


async function showAllStreamings(){
    await indexStreamings()
    addFavorite()
}
