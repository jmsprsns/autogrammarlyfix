var active = true; // Control flag to start or stop the script

// Function to dispatch mouse events
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

// Simulate clicks based on absolute positions from the left of the screen and from the top
function simulateClicks() {
    if (!active) {
        console.log("Script is no longer active.");
        return;
    }

    // Position for the button click
    console.log("Simulating button click at 1000px left and 300px top");
    simulateClick(1000, 300);

    // Wait a moment before simulating the click for the top-most item
    setTimeout(() => {
        console.log("Simulating top-most item click at 1000px left and 180px top");
        simulateClick(1000, 180);
    }, 150); // This delay allows for any necessary UI updates between clicks
}

// Helper function to perform the click action at specified coordinates
function simulateClick(x, y) {
    dispatchMouseEvent('mousemove', x, y);
    dispatchMouseEvent('mousedown', x, y);
    dispatchMouseEvent('mouseup', x, y);
    dispatchMouseEvent('click', x, y);
}

function startScript() {
    console.log("Initializing script...");
    simulateClicks();

    // If you want to continuously perform these clicks at intervals
    // refreshTimer = setTimeout(startScript, 2000); // Adjust the timing as necessary
}

startScript();

// Function to wrap up and stop the script, including cleanup of any intervals or observers
function wrapUp() {
    if (refreshTimer) clearTimeout(refreshTimer);
    if (observer) observer.disconnect();
    active = false;
    console.log("Stopping script. Success or completion condition met.");
}
