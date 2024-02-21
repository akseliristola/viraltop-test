
const keyframes = `@keyframes dot {
    0% { background-color: grey; transform: scale(1); }
    50% { background-color: #333333; transform: scale(1.3); }
    100% { background-color: grey; transform: scale(1); }
}`
const styleElement = document.createElement('style');
styleElement.type = 'text/css';

if ('sheet' in styleElement) {
    styleElement.appendChild(document.createTextNode(keyframes)); 
    document.head.appendChild(styleElement);
} else {
    const styleSheet = document.styleSheets[0] || document.styleSheets.item(0);
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length); 
}

const dots = document.createElement('div');
dots.classList.add('loading');
dots.style.alignItems = 'center';
dots.style.display = 'flex';
dots.style.justifyContent = 'center';
dots.style.height = '20px';
dots.style.width = '80px';
dots.style.backgroundColor = '#f2f2f2';
dots.style.padding = '5px';
dots.style.borderRadius = '8px';
dots.style.marginTop = '5px';
dots.style.marginLeft = '0px';
dots.style.alignSelf = "flex-start"

for (let i = 0; i < 3; i++) {
    const loadingDot = document.createElement('span');
    loadingDot.classList.add('loading__dot');
    loadingDot.style.backgroundColor = 'grey';
    loadingDot.style.display = 'inline-block';
    loadingDot.style.height = '7px';
    loadingDot.style.margin = '10px';
    loadingDot.style.width = '10px';
    loadingDot.style.borderRadius = '7px';
    loadingDot.style.animation = 'dot ease-in-out 1s infinite';
    if (i === 1) {
        loadingDot.style.animationDelay = '0.2s';
    } else if (i === 2) {
        loadingDot.style.animationDelay = '0.3s';
    }
    dots.appendChild(loadingDot);
}

export default dots