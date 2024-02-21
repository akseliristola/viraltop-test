import circleImage from "../componentTemplates/circleImage.js"
import dots from "../componentTemplates/dots.js"

let chatTemplate = document.createElement('div');
chatTemplate.style.display = "flex"
chatTemplate.style.backgroundColor="#f2f2f2"
chatTemplate.style.color = "black"
chatTemplate.style.borderRadius= "8px"
chatTemplate.style.padding="10px"
chatTemplate.style.fontFamily = "EB Garamond";
chatTemplate.style.fontSize="16px"
chatTemplate.style.fontWeight="500"

let chatInnerContainerTemplate = document.createElement('div');
chatInnerContainerTemplate.style.display="flex"
chatInnerContainerTemplate.style.flexDirection="row"
chatInnerContainerTemplate.style.margin = "20px 15px 0px 5px"


function createOneChat(inputChat,chats){
    let chatInnerContainer = chatInnerContainerTemplate.cloneNode(true)
    if(inputChat==="dots"){
        chatInnerContainer.style.maxWidth="90%"
        chatInnerContainer.style.alignSelf = "flex-start"
        chatInnerContainer.appendChild(circleImage.cloneNode(true))
        chatInnerContainer.appendChild(dots)
    }
    else{
        inputChat.role ==="system2" ? chats.push({"role":"system","content":inputChat.content}) : chats.push(inputChat)
        let chat = chatTemplate.cloneNode(true)
        chat.innerText=inputChat.content

        if(inputChat.role === "user"){
            chatInnerContainer.style.maxWidth="80%"
            chatInnerContainer.style.alignSelf = "flex-end"
        }
        else if(inputChat.role === "system2"){
            chatInnerContainer.style.maxWidth="70%"
            chatInnerContainer.style.alignSelf = "flex-start"
            chatInnerContainer.style.marginLeft = "15.5%"
        }
        else{
            chatInnerContainer.style.maxWidth="90%"
            chatInnerContainer.style.alignSelf = "flex-start"
            chatInnerContainer.appendChild(circleImage.cloneNode(true))
        }
        chatInnerContainer.appendChild(chat)
    }
    return chatInnerContainer
}

export default createOneChat