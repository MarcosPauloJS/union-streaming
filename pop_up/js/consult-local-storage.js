const consultLocalStorage = {
        list: ()=>{
            let dataLocalStorage = []
            let myFavorites = window.localStorage.getItem("my-favorites");
          
            if(!myFavorites){
                dataLocalStorage = null;
                return dataLocalStorage;
            }
            else{
                const roughDataStreaming = myFavorites.split(',');
        
                roughDataStreaming.forEach((item)=>{  
                    if(dataLocalStorage.length === 0){
                        dataLocalStorage.push([item]);
                        return
                    }
        
                    if(dataLocalStorage[dataLocalStorage.length - 1].length < 3){
                        dataLocalStorage[dataLocalStorage.length - 1].push(item);
                    }
                    else{
                        if(!item) return;
                        dataLocalStorage[dataLocalStorage.length] = [item];
                    }
                });

                return dataLocalStorage
            }
        },
        
        save: async (name, urlImage, link)=>{
            let myFavorites = window.localStorage.getItem("my-favorites");
            let dataStreaming = await `${name},${urlImage},${link},`;

            if(!myFavorites){
                window.localStorage.setItem("my-favorites", dataStreaming);
                return;
            }

            const existing = await myFavorites.split(',').filter( item => item === name);
            
            if(existing.length >= 1) return;
    
            if(myFavorites){  
                myFavorites += dataStreaming;       
                window.localStorage.setItem("my-favorites", myFavorites);
            }
            else{
                window.localStorage.setItem("my-favorites", dataStreaming);
            }
        },

        delete: async (name, urlImage, link)=>{
            let myFavorites = window.localStorage.getItem("my-favorites");

            if(!myFavorites) return;

            const filteredData = await myFavorites.split(',').filter( item => {
                
                if(item === name || item === urlImage || item === link){
                    return false;
                }
                else{
                    return true;
                }
            });
     
            window.localStorage.setItem("my-favorites", filteredData);
        }
}
    