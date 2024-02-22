
function createChatIcon() {
    const parent = document.createElement("div");    

    const box = document.createElement("div");
    box.style.width = "20px";
    box.style.height = "18px";
    box.style.borderRadius = "5px";
    box.style.backgroundColor = "white";
    box.style.position = "absolute";
    box.style.left = "17px";
    box.style.bottom = "20px";
    box.style.zIndex = "1";

    const triangle = document.createElement("div");
    triangle.style.borderLeft = "5px solid transparent";
    triangle.style.borderRight = "5px solid transparent";
    triangle.style.borderTop = "10px solid white";
    triangle.style.position = "absolute";
    triangle.style.bottom = "15px";
    triangle.style.left = "14px";
    triangle.style.transform = "rotate(40deg)"

    parent.appendChild(box);
    parent.appendChild(triangle);

    return parent;
}


function createChatButtonAndChatDiv(positionList){
    const chatButton = document.createElement('div');
    chatButton.style.width = "55px";
    chatButton.style.height = "55px";
    chatButton.style.borderRadius = "40px";
    chatButton.style.backgroundColor = window.ChatComponentMainColor
    chatButton.style.position = "fixed";
    chatButton.style.zIndex = "1000";
    chatButton.style.cursor = "pointer";
    chatButton.style.display = "flex";
    chatButton.style.justifyContent = "center";
    chatButton.style.alignItems = "center";
    chatButton.style.fontSize = "26px";
    chatButton.style[positionList[0]] = "10px";
    chatButton.style[positionList[1]] = "10px";

    var chatIconSvg = createChatIcon()
    chatButton.appendChild(chatIconSvg);

    const chatDiv = document.createElement('div');
    chatDiv.className="chatDiv"
    chatDiv.style.width = "350px"; 
    chatDiv.style.display = "none";
    chatDiv.style.height = "560px";
    chatDiv.style.position = "fixed";
    chatDiv.style.zIndex = "1000";
    chatDiv.style.flexDirection = "column";
    chatDiv.style.fontSize = "16px";
    chatDiv.style.border = "0.1px solid grey";
    chatDiv.style.backgroundColor = "white";
    chatDiv.style.borderRadius = "10px";
    chatDiv.style[positionList[0]] = "2px";
    chatDiv.style[positionList[1]] = "2px";
    
    return [chatDiv,chatButton]
}

export default createChatButtonAndChatDiv