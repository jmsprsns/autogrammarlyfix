var refreshTimer;
var lastValue = null;
var unchangedCount = 0;
var observer;
var active = true;

function refreshData() {
    if (active) {
        console.log("Running refreshData function");
        try {
            // Use querySelectorAll to check if any button is missed
            var buttons = document.querySelectorAll('button[data-name*="button:accept"]');
            
            var actionable = false;
            
            setTimeout(function() {
                if (!active) {
                    console.log("Script is no longer active.");
                    return;
                }
                
                buttons.forEach(function(button) {
                    // Additional check: Ensure button is not disabled
                    if (button && !button.disabled) {
                        var buttonText = button.innerText || button.textContent;
                        if (buttonText.includes("Accept") || buttonText.includes("Rephrase")) {
                            console.log(`Clicking button: ${buttonText}`);
                            button.click();
                            actionable = true;
                            unchangedCount = 0;
                            return; // Exit loop after action
                        }
                    }
                });

                if (!actionable) {
                    unchangedCount++;
                    console.log(`Unchanged Count: ${unchangedCount}. No actionable buttons found.`);
                    if (unchangedCount >= 10) {
                        wrapUp();
                        return;
                    }
                } else {
                    unchangedCount = 0;
                }

            }, 150); // Short delay to ensure page is ready

            refreshTimer = setTimeout(refreshData, 50); // Schedule next check
        } catch (error) {
            console.error("Error in refreshData: ", error);
        }
    } else {
        console.log("Refresh data function called while script is inactive.");
    }
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
