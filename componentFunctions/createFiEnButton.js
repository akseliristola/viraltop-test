
function createFiEnButton(handleLanguageChange){
    const parent = document.createElement('div')
    parent.id="FiEnButton"
    parent.style.width="70px"
    parent.style.height="25px"
    parent.style.position = "absolute";
    parent.style.top = "10px";
    parent.style.right = "100px";
    parent.style.display = "flex";
    parent.style.flexDirection = "row";
    parent.style.alignItems="center"
    parent.style.textAlign="center"
    parent.style.borderRadius="12px"

    const fi =document.createElement("div")
    fi.innerText="FI"
    fi.style.width="35px"
    fi.style.height="25px"
    fi.style.borderRadius="12px"
    fi.style.cursor="pointer"
    fi.style.backgroundColor="white"
    fi.style.color=window.ChatComponentMainColor

    fi.addEventListener("click",function(){
        let res = handleLanguageChange("finnish")
        if(res){
            fi.style.color=window.ChatComponentMainColor
            fi.style.backgroundColor="white"
            en.style.color="white" 
            en.style.backgroundColor=window.ChatComponentMainColor
        }

    })

    const en =document.createElement("div")
    en.innerText="EN"
    en.style.width="35px"
    en.style.height="25px"
    en.style.borderRadius="12px"
    en.style.cursor="pointer"

    en.addEventListener("click",function(){
        let res = handleLanguageChange("english")
        if (res){
            en.style.color=window.ChatComponentMainColor
            en.style.backgroundColor="white"
            fi.style.color="white" 
            fi.style.backgroundColor=window.ChatComponentMainColor
        }
    })    
    parent.appendChild(fi)
    parent.appendChild(en)
    return parent
}

export default createFiEnButton