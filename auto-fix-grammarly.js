var refreshTimer;
var lastValue = null;
var unchangedCount = 0;
var observer;
var active = true;

function refreshData() {
    if (active) {
        console.log("Running refreshData function");
        try {
            var allButtons = document.querySelectorAll('button[data-name="button:accept"]');

            setTimeout(function() {
                if (!active) {
                    console.log("Script is no longer active.");
                    return;
                }

                allButtons.forEach(function(button) {
                    // Directly dispatch click event to the button
                    dispatchClickEvent(button);

                    // Dispatch click event to the div inside the button
                    var div = button.querySelector('div');
                    if (div) {
                        dispatchClickEvent(div);

                        // Dispatch click event to the first span inside the div
                        var spanInDiv = div.querySelector('span');
                        if (spanInDiv) {
                            dispatchClickEvent(spanInDiv);
                        }
                    }

                    // Dispatch click event to the span containing "rippleContainer"
                    var rippleContainerSpan = button.querySelector('.rippleContainer_f1o3m0cx');
                    if (rippleContainerSpan) {
                        dispatchClickEvent(rippleContainerSpan);

                        // Dispatch click event to the span inside the "rippleContainer"
                        var spanInRippleContainer = rippleContainerSpan.querySelector('span');
                        if (spanInRippleContainer) {
                            dispatchClickEvent(spanInRippleContainer);
                        }
                    }
                });

                unchangedCount = 0;

            }, 150); // Short delay to ensure page readiness

            refreshTimer = setTimeout(refreshData, 500); // Adjusted timing for recheck
        } catch (error) {
            console.error("Error in refreshData: ", error);
        }
    } else {
        console.log("Refresh data function called while script is inactive.");
    }
}

function dispatchClickEvent(element) {
    console.log(`Clicking on element: ${element.className}`);
    var evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
    });
    element.dispatchEvent(evt);
}






function wrapUp() {
    clearTimeout(refreshTimer);
    if (observer) observer.disconnect();
    active = false;
    alert("Success, zero errors! Stopping script.");
    console.log("GrammarlyAutofix: Success, zero errors! Stopping script.");
}

// Initial call for testing purposes
console.log("Initializing script...");
refreshData();

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
console.log("Starting the process");
refreshData();
startObserving();
