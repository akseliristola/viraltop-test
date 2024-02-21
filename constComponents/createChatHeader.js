import closeChatContainer from './createCloseChatIcon.js'
import createNewChatContainer from './createNewChatIcon.js'

function toggleButtons(hideButton, showButton) {
    hideButton.style.display = 'none';
    showButton.style.display = 'flex';
}

function createChatHeader(chatDiv,chatButton,newChat){
    const chatHeader = document.createElement('div');
    chatHeader.id="chatHeader"
    chatHeader.style.width = "94.6%";
    chatHeader.style.display = "flex";
    chatHeader.style.alignItems = "center";
    chatHeader.style.justifyContent = "start";
    chatHeader.style.height = "5%";
    chatHeader.style.borderRadius = "10px 10px 0px 0px";
    chatHeader.style.backgroundColor =window.ChatComponentMainColor
    chatHeader.style.color = "white";
    chatHeader.style.padding = "10px";
    chatHeader.style.alignSelf = "flex-start";

    const imageComponent = document.createElement("img")
    imageComponent.src="https://viraltop.org/wp-content/uploads/2023/10/E26809D4-9284-46EC-B77B-ED4E2BDEC9F8_1_201_a.jpeg"
    imageComponent.alt="logo"
    imageComponent.title="logo"
    imageComponent.style.width = "40px"
    imageComponent.style.cursor="pointer"

    imageComponent.addEventListener('click', function() {
        const newPageUrl = 'https://viraltop.org/';
        window.open(newPageUrl, '_blank');
    })

    const newChatContainer = createNewChatContainer()

    newChatContainer.addEventListener('click', function() {
        newChat()
    })
    
    chatHeader.appendChild(imageComponent)
    chatHeader.appendChild(newChatContainer)
    chatHeader.appendChild(closeChatContainer)

    closeChatContainer.addEventListener('click', function() {
        toggleButtons(chatDiv,chatButton);
    })

    return chatHeader
}

export default createChatHeader