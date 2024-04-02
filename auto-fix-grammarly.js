var refreshTimer;
var lastValue = null;
var unchangedCount = 0;
var observer;
var active = true;

function refreshData() {
    if (active) {
        console.log("Running refreshData function");
        try {
            // Updated to use XPath to find buttons with text "Accept" or "Rephrase"
            var xpathForButtons = "//button[contains(@data-name, 'button:accept') and (contains(., 'Accept') or contains(., 'Rephrase'))]";
            var buttons = document.evaluate(xpathForButtons, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

            var updateAllButton = document.querySelector('button[data-name="card/update-all"]');
            var actionable = false; // Flag to check if there are actions to perform

            setTimeout(function() {
                if (!active) {
                    return; // Check active status after delay
                }
                
                for (var i = 0; i < buttons.snapshotLength; i++) {
                    var button = buttons.snapshotItem(i);
                    if (button) {
                        console.log("GrammarlyAutofix: Action button clicked.");
                        button.click();
                        actionable = true;
                        unchangedCount = 0;
                        break; // Exit after the first click to allow for re-evaluation
                    }
                }

                if (!actionable) {
                    console.log("GrammarlyAutofix: 0 errors detected, waiting...");
                }

                if (updateAllButton) {
                    console.log("Clicking updateAllButton");
                    updateAllButton.click();
                    actionable = true;
                }

                if (!actionable) {
                    unchangedCount++;
                    console.log("Unchanged Count: ", unchangedCount);
                    if (unchangedCount >= 10) {
                        clearTimeout(refreshTimer);
                        if (observer) {
                            observer.disconnect();
                        }
                        active = false;
                        alert("Success, zero errors! Stopping script.");
                        console.log("GrammarlyAutofix: Success, zero errors! Stopping script.");
                        return;
                    }
                } else {
                    unchangedCount = 0;
                }

            }, 150); // Timeout

        } catch (error) {
            console.log("Error in refreshData: ", error);
        }

        refreshTimer = setTimeout(refreshData, 50);
    }
    else {
        return;
    }
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
console.log("Starting the process");
refreshData();
startObserving();
