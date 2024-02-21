function createButtonsComponent(buttons,handleButtonClick) {
    const buttonsComponent = document.createElement('div');
    buttonsComponent.id="buttonsContainer"
    buttonsComponent.style.width = '100%';

    buttonsComponent.style.display = 'flex';
    buttonsComponent.style.flexDirection = 'column';
    buttonsComponent.style.gap = '6px';
    buttonsComponent.style.alignItems = 'start';
    buttonsComponent.style.justifyContent = 'center';
    buttonsComponent.style.marginTop="10px"
    buttonsComponent.style.marginLeft="3px"
    buttonsComponent.style.marginBottom="2px"

    buttons.forEach(originalButton => {
        const button = document.createElement('button');
        button.style.marginRight = '10px'
        button.style.backgroundColor = 'white'
        button.style.color = window.ChatComponentMainColor
        button.style.border = `1.5px solid ${window.ChatComponentMainColor}`
        button.style.borderRadius = '15px'
        button.style.padding = '5px 10px'
        button.style.cursor = 'pointer'
        button.style.width="70%"
        button.style.display = 'flex';
        button.style.fontFamily = "EB Garamond";
        button.style.fontSize="12px"
        button.innerText = originalButton.text

        button.addEventListener('mouseenter', function () {
            button.style.backgroundColor = window.ChatComponentMainColor
            button.style.color = 'white';
        });
        
        button.addEventListener('mouseleave', function () {
            button.style.backgroundColor = 'white';
            button.style.color = window.ChatComponentMainColor
        });

        button.addEventListener('click', function () {
            handleButtonClick(originalButton)
    
        })
        buttonsComponent.appendChild(button);
    })
    return buttonsComponent;
}


export default createButtonsComponent