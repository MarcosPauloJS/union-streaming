async function apiRequest( rote, method){
    const myHeaders = new Headers();
    const myInit = { 
                method,
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

    const dataApi = await fetch(`http://localhost:3333${rote}`, myInit)
    .then(async response =>{
        return await response.json()
        .then(function(data){
            return data;
        });
    })
    .catch( error =>{
     console.log(`Deu error: ${error}`)
    })

    return dataApi || "deu error"
}