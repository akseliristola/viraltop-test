function createReccomendContainer(reccomends){
    let parent = document.createElement("div")
    parent.style.height="190px"
    parent.style.maxWidth="98%"
    parent.style.display="flex"
    parent.style.flexDirection="row"
    parent.style.marginTop="12px"
    parent.style.marginLeft="1%"
    parent.style.marginRight="1%"
    parent.style.gap="4px"
    parent.style.overflowX="scroll"

    for(var note of reccomends.map(n=>n.note)){
         
        let newDiv =document.createElement("div")
        newDiv.style.width="140px"
        newDiv.style.height="178px"
        newDiv.style.border="0.5px solid grey"
        newDiv.style.display="flex"
        newDiv.style.justifyContent="start"
        newDiv.style.flexDirection="column"
        newDiv.style.cursor="pointer"
    
        newDiv.addEventListener('click', function() {
            window.open(note.link, '_blank');
        })
    
        let picHolder=document.createElement("img")
        picHolder.style.width="140px"
        picHolder.style.height="120px"
        picHolder.src=note.url
    
        newDiv.appendChild(picHolder)
    
        let nameHolder=document.createElement("div")
        nameHolder.style.width="140px"
        nameHolder.style.fontSize="9px"
        nameHolder.innerText=note.name
    
        newDiv.appendChild(nameHolder)
    
        let priceHolder = document.createElement("div")
        priceHolder.style.width="140px"
        priceHolder.style.fontSize="9px"
        priceHolder.innerText=note.price
        newDiv.appendChild(priceHolder)
    
    
        let infoHolder=document.createElement("div")
        infoHolder.style.width="140px"
        infoHolder.style.height="40px"
        infoHolder.style.fontSize="6px"
        infoHolder.innerText=note.description
        newDiv.appendChild(infoHolder)

        parent.appendChild(newDiv)
    }
    return parent
}
export default createReccomendContainer