function createNewChatContainer(){
    const newChatContainer = document.createElement('div');
    newChatContainer.style.width = "25px";
    newChatContainer.style.height = "25px";
    newChatContainer.style.position = "absolute";
    newChatContainer.style.top = "10px";
    newChatContainer.style.right = "50px";
    newChatContainer.style.cursor = "pointer"

    const newChatIcon = document.createElement('div');
    newChatIcon.style.width = "25px";
    newChatIcon.style.height = "25px";
    newChatIcon.style.backgroundColor="white"
    newChatIcon.style.borderRadius="50%"
    newChatIcon.style.display="flex"
    newChatIcon.style.alignItems="center"
    newChatIcon.style.justifyContent="center"

    const innerCircle = document.createElement('div');
    innerCircle.style.width = "22px";
    innerCircle.style.height = "22px";
    innerCircle.style.backgroundColor=window.ChatComponentMainColor
    innerCircle.style.borderRadius="50%"


    const innerSquare = document.createElement('div');
    innerSquare.style.width = "25px";
    innerSquare.style.height = "25px";
    innerSquare.style.backgroundColor=window.ChatComponentMainColor
    innerSquare.style.position = "absolute";
    innerSquare.style.right = "11px";
    innerSquare.style.top = "11px";

    const triangle = document.createElement("div");
    triangle.style.width = "0";
    triangle.style.height = "0";
    triangle.style.borderLeft = "4px solid white";
    triangle.style.borderTop = "4px solid transparent";
    triangle.style.borderBottom = "4px solid transparent";
    triangle.style.transform = "rotate(90deg)";
    triangle.style.left = "-1px";
    triangle.style.position = "absolute";

    newChatIcon.appendChild(innerSquare)
    newChatIcon.appendChild(innerCircle)
    newChatIcon.appendChild(triangle)

    newChatContainer.appendChild(newChatIcon)
    
    return newChatContainer
}

export default createNewChatContainer