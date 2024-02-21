
const closeChatContainer = document.createElement('div');
closeChatContainer.style.width = "25px";
closeChatContainer.style.height = "25px";
closeChatContainer.style.position = "absolute";
closeChatContainer.style.top = "10px";
closeChatContainer.style.right = "10px";
closeChatContainer.style.cursor = "pointer";

const parent = document.createElement("div");

const cross1 = document.createElement("div");
cross1.style.width = "110%";
cross1.style.height = "2px";
cross1.style.backgroundColor = "white";
cross1.style.transform = "rotate(45deg)";
cross1.style.position = "absolute";
cross1.style.top = "50%";
cross1.style.left = "0";

const cross2 = document.createElement("div");
cross2.style.width = "110%";
cross2.style.height = "2px";
cross2.style.backgroundColor = "white";
cross2.style.transform = "rotate(-45deg)";
cross2.style.position = "absolute";
cross2.style.top = "50%";
cross2.style.left = "0";

parent.appendChild(cross1);
parent.appendChild(cross2);
closeChatContainer.appendChild(parent)


export default closeChatContainer