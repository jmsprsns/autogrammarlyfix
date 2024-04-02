var refreshTimer;
var observer;
var active = true; // Control flag to start or stop the script

// Function to dispatch mouse events
function dispatchMouseEvent(target, eventType, clientX, clientY) {
    const event = new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: clientX,
        clientY: clientY
    });
    target.dispatchEvent(event);
}

// Primary function to handle the dynamic content and click actions
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
    const baseX = window.scrollX + sidebarRect.left;
    const baseY = window.scrollY + sidebarRect.top;

    // First click position inside the sidebar
    performClicks(baseX + 64, baseY + 334);

    // Second click position for the top-most item, after a delay
    setTimeout(() => performClicks(baseX + 92, baseY + 238), 150);
}

// Helper function to simulate the clicks at specified coordinates
function performClicks(x, y) {
    console.log(`Simulated click at (${x}, ${y})`);
    dispatchMouseEvent(document.documentElement, 'mousemove', x, y);
    dispatchMouseEvent(document.documentElement, 'mousedown', x, y);
    dispatchMouseEvent(document.documentElement, 'mouseup', x, y);
    dispatchMouseEvent(document.documentElement, 'click', x, y);
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
