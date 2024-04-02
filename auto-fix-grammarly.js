var active = true; // Control flag to start or stop the script

function simulateClicks() {
    setInterval(() => {
        // Simulate mouse cursor movement to the top-most item position
        dispatchMouseEvent('mousemove', 1000, 180);
        dispatchMouseEvent('mousedown', 1000, 180);
        dispatchMouseEvent('mouseup', 1000, 180);
        dispatchMouseEvent('click', 1000, 180);

        // Wait half a second before simulating the button click to allow for visual distinction
        setTimeout(() => {
            // Simulate mouse cursor movement to the button position
            dispatchMouseEvent('mousemove', 1000, 300);
            dispatchMouseEvent('mousedown', 1060, 300);
            dispatchMouseEvent('mouseup', 1060, 300);
            dispatchMouseEvent('click', 1000, 300);
        }, 500); // This delay is within the 1-second interval of the whole process
    }, 1000); // Repeat this process every second
}

// Helper function to dispatch mouse events
function dispatchMouseEvent(eventType, clientX, clientY) {
    const event = new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: clientX,
        clientY: clientY
    });
    document.dispatchEvent(event);
}

function startScript() {
    console.log("Initializing script...");
    simulateClicks();
}

startScript();
