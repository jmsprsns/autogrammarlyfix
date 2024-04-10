// My code
 
 
function simulateUserClick(button) {
console.log('simulateUserClick called');
const rect = button.getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;
 
console.log('Starting simulation of detailed interaction with the button.');
 
const simulateEvent = (eventName, x, y, properties = {}) => {
    const eventInit = {
        bubbles: true, 
        cancelable: true, 
        clientX: x || 0,
        clientY: y || 0,
        ...properties
    };
    
    // Tries to bypass preventDefault
    Object.defineProperty(eventInit, "isTrusted", { get: () => true });
 
    const event = new MouseEvent(eventName, eventInit);
    button.dispatchEvent(event);
    console.log(`Dispatched ${eventName} at (${x}, ${y}) with properties:`, properties);
};
 
simulateEvent('focus');
if(document.activeElement) {
    document.activeElement.blur();
}
simulateEvent('mouseenter');
button.setAttribute('data-hovered', 'true');
simulateEvent('mousemove', centerX, centerY);
simulateEvent('pointerdown', centerX, centerY, { button: 0, isPrimary: true });
simulateEvent('mousedown', centerX, centerY, { button: 0 });
 
setTimeout(() => {
    simulateEvent('pointerup', centerX, centerY, { button: 0, isPrimary: true });
    simulateEvent('mouseup', centerX, centerY, { button: 0 });
    simulateEvent('click', centerX, centerY);
    simulateEvent('mousedown', centerX, centerY);
    simulateEvent('pointerdown', centerX, centerY);
    simulateEvent('dblclick', centerX, centerY);
 
    // Directly call the click method
    try {
        button.click();
    } catch {
        console.error('Failed to execute direct click method.');
    }
 
    simulateEvent('blur');
    console.log('Simulated click dispatched.');
}, 100);
 
console.log('Detailed interaction simulation completed.');
}
 
 
let buttonClicked = false;
 
function scanForButton() {
if (buttonClicked) return; // exit if the button has already been clicked
 
console.log('scanForButton called');
const button = Array.from(document.querySelectorAll('button'))
   .find(btn => btn.getAttribute('data-name') === 'button:accept' && btn.textContent.includes('Accept'));
if (button) {
    console.log('Button found, calling simulateUserClick');
    simulateUserClick(button);
    buttonClicked = true; // set true as the button has been clicked
} else {
    console.log('Button not found');
}
}
 
const observer = new MutationObserver(() => {
scanForButton();
});
observer.observe(document.body, { childList: true, subtree: true });
 
// Initial scan in case the button is already present
scanForButton();
