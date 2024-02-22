


function createChatInputArea(handleSendMessage){
    const sendIcon = document.createElement("div");

    const triangleOuter = document.createElement("div");
    triangleOuter.style.width = "0";
    triangleOuter.style.height = "0";
    triangleOuter.style.borderLeft = "20px solid white";
    triangleOuter.style.borderTop = "10px solid transparent";
    triangleOuter.style.borderBottom = "10px solid transparent";
    triangleOuter.style.position = "relative";
    triangleOuter.style.bottom = "0";
    triangleOuter.style.zIndex = "1";

    const triangleInner = document.createElement("div");
    triangleInner.style.width = "0";
    triangleInner.style.height = "0";
    triangleInner.style.borderLeft = `15px solid ${window.ChatComponentMainColor}`
    triangleInner.style.borderTop = "1.9px solid transparent";
    triangleInner.style.borderBottom = "1.9px solid transparent";
    triangleInner.style.top = "11.5px";
    triangleInner.style.position = "relative";
    triangleInner.style.zIndex = "2"

    sendIcon.appendChild(triangleInner);
    sendIcon.appendChild(triangleOuter);
    sendIcon.style.display = "inline-block";

    const chatInputArea = document.createElement('div');
    chatInputArea.style.width = "100%";
    chatInputArea.style.display = "flex";
    chatInputArea.style.alignItems = "center";
    chatInputArea.style.justifyContent = "start";
    chatInputArea.style.bottom = "0";
    chatInputArea.style.marginBottom="2px"
    chatInputArea.style.marginTop="4px"
    chatInputArea.style.paddingBottom="4px"


    const textarea = document.createElement('textarea');
    textarea.style.resize = "none";
    textarea.style.overflowY = "auto"; 
    textarea.style.width = "75%";
    textarea.style.fontFamily="Arial"
    textarea.style.height="40px"
    textarea.style.marginLeft="5px"

    const sendButton = document.createElement('button');
    sendButton.style.width = "15%";
    sendButton.style.height = "40px";
    sendButton.style.backgroundColor =window.ChatComponentMainColor
    sendButton.style.border = "none";
    sendButton.style.borderRadius = "5px";
    sendButton.style.marginLeft = "10px";
    sendButton.style.cursor = "pointer";

    sendButton.appendChild(sendIcon)

    chatInputArea.appendChild(textarea);
    chatInputArea.appendChild(sendButton);



    textarea.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            try{
                textarea.blur();
                handleSendMessage(textarea)
                textarea.value=""
            }
            catch(e){}
        }
    })

    sendButton.addEventListener('click', function() {
        try{
            textarea.blur();
            handleSendMessage(textarea)
        }
        catch(e){}
    })
    return chatInputArea
}

export default createChatInputArea