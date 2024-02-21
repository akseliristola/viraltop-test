import createOneChat from "./createOneChat.js"

function createLeadContainer(texts,chatsContainerComponent,chats,url){
    let parent = document.createElement("div")
    parent.style.width="250px"
    parent.style.display="flex"
    parent.style.flexDirection="column"
    parent.style.gap="6px"
    parent.style.padding="10px"
    parent.style.border = "1px solid grey"
    parent.style.marginLeft = "50%"
    parent.style.transform="translateX(-50%)"
    parent.style.marginTop = "10px"

    let emailDiv=document.createElement("div")
    emailDiv.style.display="flex"
    emailDiv.style.flexDirection="column"
    emailDiv.style.gap="6px"

    let emailText=document.createElement("span")
    emailText.innerText="Email"

    let email=document.createElement("input")

    emailDiv.appendChild(emailText)
    emailDiv.appendChild(email)

    parent.appendChild(emailDiv)

    let phoneDiv=document.createElement("div")
    phoneDiv.style.display="flex"
    phoneDiv.style.flexDirection="column"
    phoneDiv.style.gap="6px"

    let phoneText=document.createElement("span")
    phoneText.innerText="Puhelinnumero"

    let phone=document.createElement("input")

    phoneDiv.appendChild(phoneText)
    phoneDiv.appendChild(phone)

    parent.appendChild(phoneDiv)

    let textDiv=document.createElement("div")
    textDiv.style.display="flex"
    textDiv.style.flexDirection="column"
    textDiv.style.gap="6px"

    let textText=document.createElement("span")
    textText.innerText="Lisättävää?"

    let text=document.createElement("textarea")
    text.style.resize="none"

    textDiv.appendChild(textText)
    textDiv.appendChild(text)
    parent.appendChild(textDiv)        

    let sendButton = document.createElement("button")
    sendButton.innerText="send"

    sendButton.addEventListener('click', function () {
        chatsContainerComponent.removeChild(parent)
        let chatInnerContainer = createOneChat("dots",chats)

        chatsContainerComponent.appendChild(chatInnerContainer)

        chatsContainerComponent.scrollTop = chatsContainerComponent.scrollHeight;

        let children = parent.childNodes;

        const data = {
            prevChats:chats,
            phone: children[0].childNodes[1].value,
            email: children[1].childNodes[1].value,
            text:children[2].childNodes[1].value
        }

        const requestOptions = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        }

        fetch( `${url}/chatEmail`, requestOptions)
            .then(n=>{
                chatsContainerComponent.removeChild(chatInnerContainer)
                let afterFormChat=texts[0].text
                let newChat=createOneChat({"role":"system","content": afterFormChat},chats)
                chatsContainerComponent.appendChild(newChat)
                chatsContainerComponent.scrollTop = chatsContainerComponent.scrollHeight;
            })
            .catch(n=>{
                try{
                    chatsContainerComponent.removeChild(chatInnerContainer)
                }
                catch{}

                let newChat=createOneChat({"role":"system","content": "Error"},chats)
                chatsContainerComponent.appendChild(newChat)
                chatsContainerComponent.scrollTop = chatsContainerComponent.scrollHeight;
            })
        
    })
    parent.appendChild(sendButton)
    return parent
}

export default createLeadContainer