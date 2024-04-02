var refreshTimer;
var observer;
var active = true; // Control flag to start or stop the script

// Utility function to dispatch mouse events
function dispatchMouseEvent(target, eventType, options = {}) {
    const event = new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window,
        ...options
    });
    target.dispatchEvent(event);
}

// Function to perform simulated mouse movements and clicks within the sidebar
function refreshData() {
    if (!active) {
        console.log("Script is no longer active.");
        return;
    }

    const sidebar = document.querySelector('aside[data-name="sidebar-tier"]');
    if (!sidebar) {
        console.log("Sidebar container not found.");
        return;
    }

    const sidebarRect = sidebar.getBoundingClientRect();
    // Ensure clicks are within the viewport
    simulateClick(Math.max(0, sidebarRect.left + 64), Math.max(0, sidebarRect.top + 334));
    setTimeout(() => simulateClick(Math.max(0, sidebarRect.left + 92), Math.max(0, sidebarRect.top + 238)), 100);
}


function simulateClick(x, y) {
    // Adjusting by window's scroll offsets
    x += window.scrollX;
    y += window.scrollY;

    const options = { clientX: x, clientY: y, screenX: x, screenY: y };
    dispatchMouseEvent(document, 'mousemove', options);
    dispatchMouseEvent(document, 'mousedown', options);
    dispatchMouseEvent(document, 'mouseup', options);
    dispatchMouseEvent(document, 'click', options);
    console.log(`Simulated click at (${x}, ${y})`);
}


function wrapUp() {
    clearTimeout(refreshTimer);
    if (observer) observer.disconnect();
    active = false;
    alert("Success, zero errors! Stopping script.");
    console.log("GrammarlyAutofix: Success, zero errors! Stopping script.");
}

function checkForChanges() {
    console.log("Running checkForChanges function");
    refreshData(); // Call refreshData to handle dynamic content
}

function startObserving() {
    console.log("Starting to observe");
    var targetNode = document.querySelector('.counterText'); // Adjust if a different parent element is more appropriate

    if (!targetNode) {
        console.log("Target node not found");
        return;
    }

    var config = { childList: true, subtree: true };

    observer = new MutationObserver(function(mutations) {
        console.log("Mutation observed");
        checkForChanges();
    });

    observer.observe(targetNode, config);
}

// Start the process
console.log("Initializing script...");
refreshData();
startObserving();
