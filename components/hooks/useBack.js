const useBack = async(url) =>{
    const response = await fetch(url)
    if(!reponse.ok){
        throw new Error('Error servidor')
    }
    console.log(reponse.text())
}

export { useBack }
