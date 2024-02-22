import createChatButtonAndChatDiv from './constComponents/createChatButtonAndChatDiv.js'
import createChatHeader from './constComponents/createChatHeader.js'

import createLeadContainer from './componentFunctions/createLeadContainer.js'
import createFiEnButton from './componentFunctions/createFiEnButton.js'
import createReccomendContainer from './componentFunctions/createReccomendContainer.js'
import createOneChat from './componentFunctions/createOneChat.js'
import createChatInputArea from './constComponents/createChatInputArea.js'
import createButtonsComponent from './componentFunctions/createButtonsComponent.js'

//let allDragNotes=[]  
import allDragNotes from './dragNotes.js'

//let dragNotes=[]  
let dragNotes = allDragNotes["finnish"]



let originalChat
let inAction=false
let originalChatComponent
let id=null
let chats=[]
let buttonsContainer
let curLang="finnish"
let leadContainer
let container

function isValidColor(strColor) {
    var s = new Option().style;
    s.color = strColor;
    return s.color !== '';
}


function toggleButtons(hideButton, showButton) {
    hideButton.style.display = 'none';
    showButton.style.display = 'flex';
}

let scriptTag = document.getElementById('viraltop-script');
let allowed
let banned


(function(history){
    var pushState = history.pushState;
    history.pushState = function(state, title, url) {
        if((allowed.concat(banned).length>0)){
            if(allowed.includes(url.split("/")[1]) && !banned.includes(url.split("/")[1]) ){
                container.style.display="block"
              }
            else{
                container.style.display="none"
            }
        }

        return pushState.apply(history, [state, title, url]);
    };
})(window.history);



document.addEventListener('DOMContentLoaded', function() {

    try{
        allowed=scriptTag.getAttribute('allowed-paths').split(",")
    }
    catch(e){
        allowed=[]
    }

    try{
        banned=scriptTag.getAttribute('banned-paths').split(",")
    }
    catch(e){
        banned=[];
    }

    const chatsContainerComponent = document.createElement('div');
    chatsContainerComponent.style.width = "100%"
    chatsContainerComponent.style.height = "100%"
    chatsContainerComponent.style.display = "flex"
    chatsContainerComponent.style.flexDirection = "column"
    chatsContainerComponent.style.overflow = "scroll"
    chatsContainerComponent.style.scrollBehavior = "smooth"
    chatsContainerComponent.style.padding = "1px"
    chatsContainerComponent.style.fontFamily = "Arial"

    let param1 = scriptTag.getAttribute('data-param1');

    let colorParam = scriptTag.getAttribute('color');
    window.ChatComponentMainColor=isValidColor(colorParam) ? colorParam:"#041F3E"

    let position=scriptTag.getAttribute('position');
    let positionList

    if(position === "bottom-right"){
        positionList=["bottom","right"]
    }
    else if(position === "top-right"){
        positionList=["top","right"]

    }
    else if(position === "top-left"){
        positionList=["top","left"]
    }
    else{
        positionList=["bottom","left"]
    }


    let first=dragNotes.find(n=>n.title.connection === "0")

    const url="https://concise-rampart-413810.lm.r.appspot.com"
    //const url="http://localhost:5000"


    function handleButtonClick(originalButton){
        if(!inAction){
            inAction=true
            try{
                chatsContainerComponent.removeChild(buttonsContainer)
            }
            catch(e){}

            let newChat=createOneChat({"role":"user","content":originalButton.text},chats)

            chatsContainerComponent.appendChild(newChat)

            let dotsContainer = createOneChat("dots",chats)

            chatsContainerComponent.appendChild(dotsContainer)
            chatsContainerComponent.scrollTop = chatsContainerComponent.scrollHeight;

            setTimeout(function() {
                chatsContainerComponent.removeChild(dotsContainer)
                try{
                    let next = dragNotes.find(n=> n.title.id === originalButton.connection)

                    if(next.title.title.startsWith("!")){
                        let newRes=createOneChat({"role":"system","content":next.title.title.slice(1)},chats)
                        chatsContainerComponent.appendChild(newRes)
                        leadContainer=createLeadContainer(next.texts,chatsContainerComponent,chats,url)
                        chatsContainerComponent.appendChild(leadContainer)

                    }
                    else{
                        let newRes=createOneChat({"role":"system","content":next.title.title},chats)
                        chatsContainerComponent.appendChild(newRes)
                        
                        if(next.texts.length>0){
                            let reccomends=next.texts.filter(n=>n.text.startsWith("@"))

                            if(reccomends.length>0){
                                let reccomendContainer=createReccomendContainer(reccomends)
                                chatsContainerComponent.appendChild(reccomendContainer)
                            }
                            let buttonsLeft=next.texts.filter(n=>!n.text.startsWith("@"))
                            if(buttonsLeft.length>0){
                                buttonsContainer = createButtonsComponent(next.texts,handleButtonClick);
                                chatsContainerComponent.appendChild(buttonsContainer)
                            }   
                        }
                    }
                    chatsContainerComponent.scrollTop = chatsContainerComponent.scrollHeight;
                    inAction=false
                }
                catch(e){
                    let newRes=createOneChat({"role":"system","content":"Error"},chats)
                    chatsContainerComponent.appendChild(newRes)
                    chatsContainerComponent.scrollTop = chatsContainerComponent.scrollHeight;
                    inAction=false
                }
            }, 2000);
        }
    }


    function handleLanguageChange(lang){
        if(!inAction && curLang !== lang){
            inAction=true
            id=null
            chats=[]
            dragNotes=allDragNotes[lang]
            first=dragNotes.find(n=>n.title.connection === "0")
            if(first){
                originalChat={"role":"system","content":first.title.title}
            }
            else{
                originalChat= lang === "english" ? {"role":"system","content":"Hi, how can I help you?"} : {"role":"system","content":"Hei, miten voin auttaa?"} 
            }
            originalChatComponent = createOneChat(originalChat,chats)
            curLang=lang
            inAction=false
            refreshChat()
            return true
        }
    }


    function handleSendMessage(textarea){
        if(!inAction){
            inAction=true
            let newChat=createOneChat({"role":"user","content":textarea.value},chats)
            try{
                chatsContainerComponent.removeChild(buttonsContainer)
            }
            catch(e){}
            try{
                chatsContainerComponent.removeChild(leadContainer)
            }catch(e){}

            chatsContainerComponent.appendChild(newChat)

            let dotsContainer = createOneChat("dots",chats)
            chatsContainerComponent.appendChild(dotsContainer)

            chatsContainerComponent.scrollTop = chatsContainerComponent.scrollHeight;
            let postData = {
                chats: chats,
                id:id,
                language:curLang
            }

            textarea.value=""
        
            fetch(`${url}/chatbot/${param1}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Adjust the content type as needed
                },
                body: JSON.stringify(postData)
            })
            .then(response => {
                if (!response.ok) {
                    inAction=false
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Assuming the response is in JSON format
            })
            .then(data => {
                if(data.id){
                    id=data.id
                }
                chatsContainerComponent.removeChild(dotsContainer);

                if(data.result !== ""){
                    let newRes = createOneChat({"role":"system","content":data.result},chats);
                    chatsContainerComponent.appendChild(newRes);
                }

                if(data.nextButtons !== undefined){
                    const next=dragNotes.find(n=>n.endpoint === data.nextButtons)

                    if(next){
                        let newRes = createOneChat({"role": "system" ,"content":next.title.title},chats);
                        chatsContainerComponent.appendChild(newRes);
                        if(next.texts.length>0){
                            buttonsContainer = createButtonsComponent(next.texts,handleButtonClick);
                            chatsContainerComponent.appendChild(buttonsContainer);
                        }
                    }
                    else{
                        let newRes = createOneChat({"role":"system","content":"Error"},chats);
                        chatsContainerComponent.appendChild(newRes);
                    }
                }
                chatsContainerComponent.scrollTop = chatsContainerComponent.scrollHeight;
                inAction=false
            })
            .catch(error => {
                console.log(error)
                try{
                    chatsContainerComponent.removeChild(dotsContainer);
                }
                catch(e){}
                let newRes = createOneChat({"role":"system","content":"Error"},chats);
                chatsContainerComponent.appendChild(newRes);
                chatsContainerComponent.scrollTop = chatsContainerComponent.scrollHeight;
                inAction=false
            }); 
        }
    }



    function refreshChat(){
        if(!inAction){
            chats=[originalChat]
            while (chatsContainerComponent.firstChild) {
                chatsContainerComponent.removeChild(chatsContainerComponent.firstChild);
            }
            chatsContainerComponent.appendChild(originalChatComponent)
            id=null
            if(first && first.texts && first.texts.length>0){
                const button = first.texts
                buttonsContainer = createButtonsComponent(button,handleButtonClick);
                chatsContainerComponent.appendChild(buttonsContainer)
            }
        }
    }


    if(first === undefined){
        originalChat={"role":"system","content":"Hei, miten voin auttaa sinua?"}
    }
    else{
        originalChat={"role":"system","content":first.title.title}
        if(first.texts && first.texts.length>0){
            const button = first.texts
            buttonsContainer = createButtonsComponent(button,handleButtonClick);
        }
    }

    chats.push(originalChat)

    originalChatComponent = createOneChat(originalChat,chats)
    chatsContainerComponent.appendChild(originalChatComponent)

    if(buttonsContainer){
        chatsContainerComponent.appendChild(buttonsContainer)
    }

    const [chatDiv,chatButton] = createChatButtonAndChatDiv(positionList)

    const chatInputArea=createChatInputArea(handleSendMessage)

    const chatHeader=createChatHeader(chatDiv,chatButton,refreshChat)

    if(Object.keys(allDragNotes).length>1){
        let fiEnButton=createFiEnButton(handleLanguageChange)
        chatHeader.appendChild(fiEnButton)
    }

    chatDiv.appendChild(chatHeader);
    chatDiv.appendChild(chatsContainerComponent)
    chatDiv.appendChild(chatInputArea);

    container = document.createElement('buttonContainer');
    container.appendChild(chatButton);
    container.appendChild(chatDiv);

    if(allowed.concat(banned).length>0 && (!allowed.includes(window.location.pathname.split("/")[1]) || banned.includes(window.location.pathname.split("/")[1])) ){
        container.style.display="none"
    }

    chatButton.addEventListener('click', function() {
        toggleButtons(chatButton, chatDiv);
    })

    document.body.appendChild(container)


/*     const blankElement=document.createElement("input")
    blankElement.style.display="none"
    blankElement.id="viralTopInput"
    document.head.appendChild(blankElement)
    
    blankElement.addEventListener('input', function() {
        handleCompanyChange(blankElement.value)
      })
     
    
    async function handleCompanyChange(newCompanyID){
        param1=newCompanyID
        let vv=await fetch(`${url}/companyDragNotes/${newCompanyID}`)
        allDragNotes=await vv.json()
        console.log(allDragNotes)

        let header=document.getElementById("chatHeader")

        if(Object.keys(allDragNotes).length>1){
            let fiEnButton=createFiEnButton(handleLanguageChange)
            header.appendChild(fiEnButton)
        }
        else{
            const fienButton = document.getElementById("FiEnButton")
            if(fienButton){
                header.removeChild(fienButton)
            }
        }
        curLang="finnish"
        dragNotes=allDragNotes[curLang]
        console.log(1,dragNotes)
        if(dragNotes){
            first=dragNotes.find(n=>n.title.connection === "0")
        }

        originalChat = first === undefined ? {"role":"system","content":"Hei, miten voin auttaa sinua?"} : {"role":"system","content":first.title.title}
        originalChatComponent =createOneChat(originalChat,chats)

        refreshChat()
    }  */

})